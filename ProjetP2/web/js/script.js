(function($){
    "use strict";
    console.log("on est là");
    var $options = $(".question select option");
    $options.on('click',function(){
        var $this = $(this);
        $options.each(function () {
            $(this).removeAttr('selected');
        });
        $this.attr('selected','selected');
        switch ($this.attr("value")){
            case "0":
                $("#content").html("<label for='textContent'>Titre de votre question :</label><input id='textContent' type='text'>");
                break;
            case "1":
                $("#content").html("");
                break;

        }
       console.log("this",$this);
    });
}(jQuery));