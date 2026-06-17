<?php

function PayPalRoutes($method, $uri, $body, $paypalCtrl)
{
  if ($method === 'POST' && $uri === '/paypal/capture') {
    $paypalCtrl->captureOrder($body);
    return true;
  }

  return false;
}
