<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Question;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class QuestionsController extends Controller
{
    /**
     * @Route("/addQuestion", name="addQuestion")
     */
    public function addQuestion()
    {
        $user = $this->getUser();
        $repository = $this->getDoctrine()
            ->getRepository('AppBundle:Survey');
        $survey = $repository->findOneBy(array('user' => $user->getId()));
        $question = new Question();
        var_dump($survey->getTitle());
        return $this->render('survey/survey.html.twig');
    }
}
