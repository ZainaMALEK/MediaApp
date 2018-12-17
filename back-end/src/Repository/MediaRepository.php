<?php

namespace App\Repository;

use App\Entity\Media;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Media|null find($id, $lockMode = null, $lockVersion = null)
 * @method Media|null findOneBy(array $criteria, array $orderBy = null)
 * @method Media[]    findAll()
 * @method Media[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Media::class);
    }

    public function findAllAssoc()
    {
      $connection = $this->getEntityManager()
        ->getConnection();
      $sql =
        'SELECT media.id, type, author,title, start, end, user
          FROM media
          LEFT JOIN loaning ON loaning.media_id = media.id
          WHERE loaning.end > NOW() OR loaning.end IS NULL
        ';
      $query = $connection->prepare($sql);
      $query->execute();
      return $query->fetchAll();
    }


    public function findByFiltersAssoc($author)
    {
      $connection = $this->getEntityManager()
        ->getConnection();
      $sql =
      'SELECT *
        FROM media
        WHERE author LIKE :author'
      ;

      $query = $connection->prepare($sql);
      $query->execute([':author' => '%'.$author.'%']);
      $medias = $query->fetchAll();
      //dump($medias);



      $medias_assoc = [];
      $key = 'id';
      foreach($medias as $media) {
        // extraction de l'id de la question ($answer[$key])
        // afin de créer un indice dans le tableau
        // $questions
        $medias_assoc[] =
          array(
            'type' => $media['type'],
            'title' => $media['title'],
            'author' => $media['author']
          );
    }
    return $medias_assoc;

  }

}
