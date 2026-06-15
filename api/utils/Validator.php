<?php

function validatorBody($body, $campos)
{
  foreach ($campos as $campo) {
    if (!isset($body[$campo])) {
      return false;
    }
    if (strlen(trim((string)$body[$campo])) === 0) {
      return false;
    }
  }
  return true;
}



function validatorPassword($password)
{
  if (strlen($password) < 8) {
    return false;
  }
  return true;
}

function validatorEmail($email)
{
  return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatorName($name)
{
  $longitud = mb_strlen(trim((string)$name));
  return $longitud >= 3 && $longitud <= 50;
}
