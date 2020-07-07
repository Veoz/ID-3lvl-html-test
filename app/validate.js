
$(document).ready(function(){
    $('input#name, input#tell, input#email, textarea#message').unbind().blur( function(){
        var id = $(this).attr('id');
        var val = $(this).val();

        switch(id)
        {
            case 'name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if(val.length > 2 && val != '' && rv_name.test(val))
                {
                    $(this).addClass('not_error');
                }
                else
                {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).attr( 'placeholder', 'Поле обязательно для заполнения.');
                }
                break;
            case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if(val != '' && rv_email.test(val))
                {
                    $(this).addClass('not_error');
                }
                else
                {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).attr( 'placeholder', 'Поле обязательно для заполнения.');
                }
                break;
            case 'tell':

                if(val != '')
                {
                    $(this).addClass('not_error');
                }
                else
                {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).attr( 'placeholder', 'Поле обязательно для заполнения.');
                }
                break;
            case 'message':
                if(val != '' && val.length < 5000)
                {
                    $(this).addClass('not_error');
                }
                else
                {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).attr( 'placeholder', 'Поле обязательно для заполнения.');
                }
                break;
        }
    });
    $('form#feedback-form').submit(function(e){
        e.preventDefault();
        if($('.not_error').length == 3)
        {
            $.ajax({
                url: 'send.php',
                type: 'post',
                data: $(this).serialize(),

                beforeSend: function(xhr, textStatus){
                    $('form#feedback-form :input').attr('disabled','disabled');
                },

                success: function(response){
                    $('form#feedback-form :input').removeAttr('disabled');
                    $('form#feedback-form :text, textarea').val('').removeClass().next('.error-box').text('');
                    alert(response);
                }
            });
        }
        else
        {
            return false;
        }
    });
});