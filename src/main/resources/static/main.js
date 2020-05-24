   
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>


$(() => {
  // Bind all links to push state
  $('a').on('click', (e) => {
    e.preventDefault();

    const $el = $(e.target);

    $('p').html($el.html());
    history.pushState({}, $el.text(), $el.attr('href'));
  })
});
