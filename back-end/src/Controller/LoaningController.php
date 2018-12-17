<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\MediaRepository;
use App\Entity\Loaning;

class LoaningController extends AbstractController
{

    /**
     * @Route("/loaning/api", name="loaning", methods="POST")
     */
    public function api(MediaRepository $mediaRepository , Request $request)
    {

         $request_body=json_decode($request->getContent());
         $media_id = $request_body->media_id;
         $user = $request_body->user;

         $media= $mediaRepository->find($media_id);

         $loaning = New Loaning($media, $user);
         $em = $this->getDoctrine()->getManager();
         $em->persist($loaning);
         $em->flush();
         return new JsonResponse('ok');

    }
}
