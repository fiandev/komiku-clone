const baseUrl = window.location.origin
$(document).ready(function (){
  $("#searchForm").on("submit", function (){
    window.location.href = `${baseUrl}${$(this).attr("action")}?url=${ $("#search").val() }`
  })
})