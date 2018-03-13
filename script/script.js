// rajesh.chheda@wolterskluwer.com
// samir.koppikar@wolterskluwer.com

$.ajax({
    url:"https://stage-services.journals.lww.com/IntegrationServices/MobileContentService.svc/ArticleListByFeaturedArticleGroupAndJournalShortName?featuredArticleGroupName=PRS%20Editor%27s%20Picks&journalShortName=plasreconsurg",
    accepts: {
        xml: 'text/xml'
    },
    dataType:"json",
  success:function(data){

    function truncateTitle(title){
      var truncatedTitle = title.substring(0,80);
      if(title.length > 80){
        truncatedTitle = truncatedTitle+"...";
      }
      return truncatedTitle;
    }

    function truncateAbstract(abstract){
      //extract Abstract first 240 characters of abstract after tags
      var abstract = abstract.substring(22, 143);
      //if abstract is greater than 240 characters add elipses
      if(abstract.length > 120){
        abstract = abstract+"...";
      }

      return abstract;
    }

    for(var x = 0; x < data.Articles.length; x++){
      var article = data.Articles[x];
      if(x === 0){
        //place first article in hero
        $('#hero .img-container').css({"background-image":"url("+article.ArticleImageUrl+")"});
        $('#hero h1').text(truncateTitle(article.Title));


        //add truncated abstract text node
        $('#abstract').text(truncateAbstract(article.Abstract));
        $('#main-story-link').html("<a href='"+article.ArticleFullTextUrl+"'>Read Full Story &gt;&gt;</a>");
      }else{
        //add sub story cards

        var storyCard = $('<div></div>',{
          "class": "story-card col-xs-6 col-sm-3 col-md-3",
          "html":"<a href='"+article.ArticleFullTextUrl+"'><div class='img-container'></div><h4>"+truncateTitle(article.Title)+"</h4></a>"
        });
        $("#substories").append(storyCard);

        storyCard.find('.img-container').css({"background-image":"url("+article.ArticleImageUrl+")"});
      }

    }

  },
  error: function(jqXHR,textStatus, errorThrown){
    //error handling code
  }
});
