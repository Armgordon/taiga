document.addEventListener('DOMContentLoaded', () =>{

//Работа с формой
    const form = document.getElementById('form')
    form.addEventListener('submit', formSend)

    async function formSend(e){
        e.preventDefault()

        let error = formValidate(form)
        let formData = new FormData(form)


        if (error === 0) {
            form.classList.add('_sending');
            console.log('send mail start')
            let response = await fetch('./sendmail.php', {
                method: "POST",
                body: formData
            });


            if (response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset()
                form.classList.remove('_sending')
            } else {
                alert('Ошибка HTTP:' + response.status)
                console.log(response)
                form.classList.remove('_sending')
            }

        }else {
            alert('Обязательные поля не заполнены, либо заполнены неверно!')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')
        console.log(formReq)
        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index]
            formRemoveError(input)




            if (input.value === '') {
                formAddError(input);
                error++;
            } else if (input.classList.contains('_phone')){
                if(phoneTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_email')){

                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type") === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            }
        }

        return error
    }

    function formAddError(input){
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')

    }

    //Функция теста e-mail
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }

    //Функция теста номера телефона
    function phoneTest(input) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(input.value);
    }


    function submitForm(event) {
        event.preventDefault();
        console.log(event)
        console.log(document.forms[0]);

    }

})

