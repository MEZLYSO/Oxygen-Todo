<?php

class PayPalController
{
  private $clientId;
  private $secret;
  private $baseUrl;
  private $userModel;

  public function __construct($userModel)
  {
    global $env;
    $this->clientId = $env['PAYPAL_CLIENT_ID'];
    $this->secret = $env['PAYPAL_SECRET'];
    $this->baseUrl = $env['PAYPAL_MODE'] === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';
    $this->userModel = $userModel;
  }

  public function captureOrder($body)
  {
    $orderId = $body['orderId'];
    $idUser = $body['idUser'];

    if (!$orderId || !$idUser) {
      http_response_code(400);
      echo json_encode(['message' => 'faltan datos']);
      return;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $this->baseUrl . '/v1/oauth2/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, $this->clientId . ':' . $this->secret);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
    $result = curl_exec($ch);
    curl_close($ch);

    $tokenData = json_decode($result, true);
    $accessToken = $tokenData['access_token'];

    if (!$accessToken) {
      http_response_code(500);
      echo json_encode(['message' => 'error al autenticar con paypal']);
      return;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $this->baseUrl . '/v2/checkout/orders/' . $orderId . '/capture');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Content-Type: application/json',
      'Authorization: Bearer ' . $accessToken,
    ]);
    $result = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($result, true);

    if ($data['status'] === 'COMPLETED') {
      $this->userModel->updatePremium($idUser, 1);
      echo json_encode(['message' => 'premium activado']);
    } else {
      http_response_code(400);
      echo json_encode(['message' => 'pago no completado']);
    }
  }
}
