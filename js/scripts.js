var dogRepository = (function() {
    /*object array placed inside IIFE*/
    'use strict';
    var newdogRepository = [

    ];
    /* Replaced Fetch With Ajax*/

    $.ajax({
        type: 'GET',
        url: 'https://dog.ceo/api/breeds/list/all',
        success: function(json) {
            $.each(json.message, function(item) {
                dogRepository.add(item)
                dogRepository.addListItem(item);
            });
        },
        error: function(err) {
            console.log(err);
        }
    })

    return {
        getAll: function() {
            return newdogRepository;
        },
        add: function(breed) {

            newdogRepository.push({
                breed: breed
            });
        },
        addListItem: function(breed) {
            var listItem = `<li><button class="dog-button ${breed}">${breed[0].toUpperCase() + breed.slice(1)}</button></li>`

            // create the list item and add it to the DOM
            dogListElement.append(listItem);
            $(`.${breed}`).on('click', function() {
                console.log('?')
                dogRepository.showDetails(breed)
            })

        },
        showDetails: function(breed) {

            $.ajax({
                type: 'GET',
                url: `https://dog.ceo/api/breed/${breed}/images/random`,
                success: function(imageJSON) {
                    $.ajax({
                        type: 'GET',
                        url: `https://dog.ceo/api/breed/${breed}/list`,
                        success: function(subBreedJSON) {

                            showModal({
                                breed: breed,
                                imageURL: imageJSON.message,
                                subBreeds: subBreedJSON.message
                            })
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    })

                },
                error: function(err) {
                    console.log(err);
                }
            })
        }

    };


})();

var $modalContainer = $('#detailsContainer');



//Function to show modal for dog data
function showModal(item) {
    // Get rid of any existing no breeds text
    $('.no-breeds').remove();
    $('.subbreed-list').empty();


    //create element for dog name
    $('.modal-title').text(item.breed[0].toUpperCase() + item.breed.slice(1))

    $('.breed-picture').attr('src', item.imageURL);
    if (item.subBreeds.length === 0) {
        var Element = $('<p class="no-breeds">No sub-breeds</p>');
        $('.modal-body').append(Element)
    } else {
        for (var i = 0; i < item.subBreeds.length; i++) {
            var element = $(`<li>${item.subBreeds[i][0].toUpperCase()}${item.subBreeds[i].slice(1)}</li>`);
            $('.subbreed-list').append(element)

        }
    }
    $('#detailsModal').modal('show');
}

//Function to show details of each dog

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
        $('#detailsModal').modal('hide');
    }
});


// getting the dog list element from index.html
var dogListElement = $('.dog-list');

// get all the dogs for looping over
dogRepository.getAll();