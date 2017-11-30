(function($){
    "use strict";
    console.log("on est là");
    var $select = $(".question select"),
        $content = $("#content");
    $select.on('change',function(){
        var $this = $(this);

        switch ($this.val()){
            case "0":
                $content.html("<div class='mdc-text-field mdc-text-field--upgraded' data-mdc-auto-init='MDCTextField'><label for='textContent' class='mdc-text-field__label required mdc-text-field__label--shake'>Titre de votre question</label><input id='textContent'  name='textContent' type='text' class='mdc-text-field__input'></div>");
                mdc.autoInit();
                break;
            case "1":
                $content.html("<label for='textContent'>Titre de votre question :</label><input id='textcontent' name='textContent' type='text'><div id='answers'><div><input type='text'></div></div><button id='addRadio'>Ajouter une réponse</button>");

                break;
            case "2":
                $content.html("<label for='textContent'>Titre de votre question :</label><input id='textContent' type='text'><div id='answers'><div><input type='text'></div></div><button id='addCheckbox'>Ajouter une réponse</button>");
                break;
            case "3":
                $content.html("<label for='textContent'>Titre de votre question :</label><input id='textContent' type='text'><button id='addCheckbox'>Ajouter une réponse</button>");
                break;

        }
    });

    $(document)
        .on('click','#addRadio',function (e) {
            e.preventDefault();
            $("#answers").append("<div><input type='text'><button class='deleteAnswer'>X</button></div>");
        })
        .on('click','.deleteAnswer',function () {
            $(this).parent().remove();
        });
    $(document)
        .on('click','#addCheckbox',function () {
            $("#answers").append("<div><input type='text'><button class='deleteAnswer'>X</button></div>");
        })
        .on('click','.deleteAnswer',function () {
            $(this).parent().remove();
        })
        .on('click',"#edit",function () {
            var surveyId = $(this).prev().data("id");
            window.location = "/survey/"+surveyId;
        });
    $("#createSurvey").on('click',function () {
        window.location = "/createSurvey";
    });


}(jQuery));