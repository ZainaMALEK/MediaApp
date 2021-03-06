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
    public function index_json(Request $request)
    {
      // récupération des paramètres URL
      $author = $request->query->get('author');
      $type = $request->query->get('type');


      $medias = $this->getDoctrine()
        ->getRepository(Media::class)
        ->findByFiltersAssoc($author, $type)
        ;

      return new JsonResponse($medias);

    }

    /**
     * @Route("/media/user", name="media_user")
     */
    public function userMedia(Request $request)
    {
    $user = $request->query->get('user');
    $medias = $this->getDoctrine()
      ->getRepository(Media::class)
      ->findMediaByUser( $user);
      ;

    return new JsonResponse($medias);
    }




}
