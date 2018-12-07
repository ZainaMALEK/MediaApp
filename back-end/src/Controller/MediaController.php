<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Form\MediaType;
use App\Entity\Media;

class MediaController extends AbstractController
{
    /**
     * @Route("/media", name="media")
     */
    public function index()
    {
        return $this->render('media/index.html.twig', [
            'controller_name' => 'MediaController',
        ]);
    }


    /**
     * @Route("/media/add", name="media_add")
     */
    public function add(Request $request)
    {
      $media = new Media();
      $form = $this->createForm(MediaType::class, $media);


      $form->handleRequest( $request);
          if ($form->isSubmitted()) {
            $media = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($media);
            $em->flush();
          }
      return $this->render('media/add.html.twig', [
          'form' => $form->createView(),
      ]);
    }


    /**
     * @Route("/media/json", name="media_json")
     */
    public function index_json()
    {
      $medias = $this->getDoctrine()
        ->getRepository(Media::class)
        ->findAllAssoc()
        ;
      // json_encode encode le corps de la requête
      // mais n'ajoute aucun header supplémentaire
      // indiquant au client qu'il s'agit de json
      // return new Response(json_encode($categories));
      return new JsonResponse($medias);
    }
}
