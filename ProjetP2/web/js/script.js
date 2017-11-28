(function($){
    "use strict";
    console.log("on est là");
    var $options = $(".question select option"),
        $content = $("#content");
    $options.on('click',function(){
        var $this = $(this);
        $options.each(function () {
            $(this).removeAttr('selected');
        });
        $this.attr('selected','selected');
        switch ($this.attr("value")){
            case "0":
                $content.html("<label for='textContent'>Titre de votre question :</label><input id='textContent'  name='textContent' type='text'>");
                break;
            case "1":
                $content.html("<label for='textContent'>Titre de votre question :</label><input id='textcontent' name='textContent' type='text'><div id='answers'><div><input type='text'></div></div><button id='addRadio'>Ajouter une réponse</button>");
                break;

        }
       console.log("this",$this);
    });

    $(document)
        .on('click','#addRadio',function () {
            $("#answers").append("<div><input type='text'><button class='deleteAnswer'>X</button></div>");
        })
        .on('click','.deleteAnswer',function () {
            $(this).parent().remove();
        });
    $("#createSurvey").on('click',function () {
        window.location = "/createSurvey";
    });

    $("#addQuestion").on('click',function () {
        window.location = "/addQuestion";
    });
}(jQuery));