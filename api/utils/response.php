<?php
function respond(int $status, array $data): void {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
