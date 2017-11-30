// modalstuff init
let modalstuff = {
    /*
    for (item of span) {
        span: onclick = function () {
            console.log("span");
            closeElement();
        }
    },
    */

    // Close when span x is clicked
    cancel_btn: onclick = console.log("knapp"),  // cancel_btn.onclick = console.log("knapp");

    //for styling av modal
    //modal_signIn.style.display = "block";
    //modal_createUser.style.display = "block"

    // When the user clicks anywhere outside of the modal, close it
    loadListeners: function() {
        window.onclick = function (event) {
            if (event.target == modal_signIn) {
                modal_signIn.style.display = "none";
            } else if (event.target == modal_createUser) {
                modal_createUser.style.display = "none";
            }
        }

        document.addEventListener('click', e => {
            console.log(e.target);
            for (item of spanElements) {
                if (item.style.display != 'none') {
                    if (e.target == item) {
                        while (item != null && item.classList != 'modalmain') {
                            item = item.parentElement;
                        }
    
                        if (item != null && item.classList == 'modalmain') {
                            item.style.display = 'none';
                        }
                    }
                }
            }
        });
    },

    openElement: function (element) {
        currentOpenElement = element.name;
        console.log(currentOpenElement);
        eval(currentOpenElement).style.display = "block"
    },

    closeElement: function () {
        console.log("Closed element");
        eval(currentOpenElement).style.display = "none";
    }
}

let modal_signIn = document.getElementById('modal_signIn');
let modal_createUser = document.getElementById('modal_createUser');
let cancel_btn = document.getElementById("cancel_btn");
let currentOpenElement = "";
let spanElements = document.getElementsByClassName("close");

modalstuff.loadListeners();