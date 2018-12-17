<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class LoaningController extends AbstractController
{

    /**
     * @Route("/loaning", name="loaning")
     */
    public function loan(Request $request)
    {
        $request_body=json_decode($request->getContent());

        
        return new JsonResponse($request_body->user);

    }
}
