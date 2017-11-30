<?php
/**
 * Created by PhpStorm.
 * User: loconox
 * Date: 29/09/2017
 * Time: 16:36
 */

namespace AppBundle\form\Type;


use AppBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('firstName',TextType::class ,
                array('label' => 'Prenom',
                    'attr' => array('class' => 'mdc-text-field__input'),
                    'label_attr' => array('class' => 'mdc-text-field__label')
                    ))
            ->add('lastName',TextType::class,array('label' => 'Nom',
                'attr' => array('class' => 'mdc-text-field__input'),
                'label_attr' => array('class' => 'mdc-text-field__label')
            ))
            ->add('mail',TextType::class,array('label' => 'Email',
                'attr' => array('class' => 'mdc-text-field__input'),
                'label_attr' => array('class' => 'mdc-text-field__label')
            ))
            ->add(
                'password',
                RepeatedType::class,
                [
                    'type' => PasswordType::class,
                    'first_options' => array('label' => 'Mot de passe',
                        'attr' => array('class' => 'mdc-text-field__input'),
                    'label_attr' => array('class' => 'mdc-text-field__label')),
                    'second_options' => array('label' => 'Répéter le mdp',
                        'attr' => array('class' => 'mdc-text-field__input'),
                    'label_attr' => array('class' => 'mdc-text-field__label')),
                ]
            );


    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefault('data_class', User::class);
    }
}