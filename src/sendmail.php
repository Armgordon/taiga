<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/SMTP.php';


    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'PHPMailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
//     $mail->setFrom('info@virturs.ru', 'ВирТур');
    $mail->setFrom('contact@taigaminiatures.com', 'Test');
    //Кому отправить
//     $mail->addAddress('vovchik.iamnot@inbox.ru');
    $mail->addAddress('dakkadakka.store@yandex.ru');
    //Тема письма
    $mail->Subject = 'Форма обратной связи на сайте';
    $mail->SMTPSecure = 'ssl';
//Cпособ связи
//    $communication = 'E-mail';
//    if($_POST['communication'] == 'phone'){
//    $communication = 'Телефон';
//}

    //Тело письма
    $body = '<h1>Сообщение с сайта <a href="http://taigaminiatures.com/">taigaminiatures.com/</a></h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }

//    if(trim(!empty($_POST['phone']))){
//                $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
//    }
//    $body.='<p><strong>Пользователь пожелал получить ответ по:</strong> '.$_POST['communication'].'</p>';

    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    $mail->Body = $body;


    //Отправка
    if(!$mail->send()) {
        $message = 'При отправке сообщения произошла ошибка. Попробуйте повторить отправку позже.';
    }
    else{
        $message = 'Ваше сообщение успешно отправленно';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

    ?>



      

