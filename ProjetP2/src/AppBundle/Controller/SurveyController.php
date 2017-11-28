<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Survey;
use AppBundle\form\SurveyType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class SurveyController extends Controller
{
    /**
     * @Route("/survey/{id}", name="survey")
     */
    public function indexAction($id)
    {
        echo "mon id".$id;
        return $this->render('survey/survey.html.twig');
    }

    /**
     * @Route("/createSurvey", name="createSurvey")
     */
    public function createSurvey(Request $request){
        $survey = new Survey();
        $user = $this->getUser();


        $form = $this->createForm(SurveyType::class, $survey);
        $form->add('Créer', SubmitType::class);

        $form->handleRequest($request);
        if ($form->isValid()) {
            $survey->setIsActive(false);
            $survey->setScope("public");
            $survey->setType("general");
            $words = explode(" ", $survey->getTitle());
            $acronym = "";

            foreach ($words as $w) {
                $acronym .= $w[0];
            }
            $survey->setUrl(uniqid($acronym));
            $survey->setUser($user);
            $user->setNbSurvey();
            $em = $this->getDoctrine()->getManager();
            $em->persist($survey);
            $em->flush();

            return $this->redirect('survey/'.$survey->getId());
        }

        return $this->render('survey/createSurvey.html.twig', [
            'form' => $form->createView(),
        ]);
    }


}
