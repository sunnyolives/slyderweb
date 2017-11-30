// lagrer resultatet fra anonym function, dette blir gjort for å forhindre navn konflikt (at ikke ting henter det samme)
const profile = (function ()
{// ================================================

	const PAGE_ID_PREFIX          = "page-";
	const PAGE_CLASS              = "page";
	const PAGE_CLASS_VISIBLE      = "page-visible";
	const MENU_ITEM_CLASS         = "menu-item";
	const MENU_ITEM_CLASS_CURRENT = "menu-item-current";

	const pages = {
		slides:  document.getElementById(PAGE_ID_PREFIX + "slides"),
		setting: document.getElementById(PAGE_ID_PREFIX + "setting"),
	};

	return {
		pages:      pages,
		hashString: window.location.hash,

		update: function () {
		  if (!window.location.hash) {
		    window.location.hash = "#slides";
		    return;
		  }

			for (let key in pages) {
				pages[key].classList.remove(PAGE_CLASS_VISIBLE);
			}
			this.showPage(window.location.hash);

			const menuItems = document.getElementsByClassName(MENU_ITEM_CLASS);
			for (let i = 0; i < menuItems.length; i++) {
				const elm  = menuItems[i];

				console.log({ wHash: window.location.hash, aHash: elm.hash, elm }); // DEBUG

				// her blir hash sjekket om den er lik href, er dette tilfellet blir classList lagt til
				if (elm.hash === window.location.hash) {
					elm.classList.add(MENU_ITEM_CLASS_CURRENT);
				} else {
					elm.classList.remove(MENU_ITEM_CLASS_CURRENT);
				}
			}
		},

		showPage: function (pageId) {
			console.log('[showPage]:', window.location.hash); // DEBUG
			console.log('[showPage]:', pageId); // DEBUG

			if (pageId === "#slides") {
				console.warn('PAGE:', 'slides');
				pages.slides.classList.add(PAGE_CLASS_VISIBLE);
			}
			// sjekker om settings linken er active
			else if (pageId === "#setting") {
				console.warn('PAGE:', 'setting');
				pages.setting.classList.add(PAGE_CLASS_VISIBLE);
			}
			// kjøres når ingen andre alternativer stemmer, da blir info siden activ
			else {
				console.error('Invalid hash:', pageId);
				window.location.hash = "#info";
			}
		},
	};

}// ================================================
)();


//===========================================
function initialize () {//====================

  profile.update();
  
  window.onhashchange = function () {
  	profile.update();
  };

	settings.init({
		onSave:          onSaveHandler, // TODO: må fikse slik en kan lagre endring av navn og bilde
		onSavePassword:  onSaveHandler, // TODO: må fikse slik en kan lagre nytt passord
		//onDelete:        clickHandler,// TODO: må fikse slik at en kan slette brukerprofilen
	});  

  slides.init({
    //onDelete:        clickHandler, // TODO: har ikke mulighet til å slette slides fra brukerprofil
    //onOpenInEditor:  clickHandler, // TODO: har ikke mulighet til å åpne i editor fra brukerprofilen
  });

  function onSaveHandler (data) {
    // fetch(util.newRequest('PUT', '/user', {
    //   // username: username // TODO: trenger brukernavn får å vite hvem som er logget inn, for å kunne gjøre endringer
    //   ...data
    // }))
    Promise.resolve(res) // bytt med fetch ovenfor
      .then(() => {
        consol.log(res);
        update();
      })
      .catch((err) => {
        util.printError(err);
      });

    clickSaveHandler(data);
  }
  update();

}//===========================================

function update () {//====================

  fetch(util.newRequest('GET', '/user/preslist', {}))
    .then((res) => {
			if (res.status == 401) {
				alert('You need to be logged in to do that!');
			} else {
				return res.json();
			}
	  })
    .then((data) => {
      slides.updateData(data);
    })
    .catch((err) => {
      util.printError(err);

      slides.updateData(data2list(2)); // TODO: Remove later
    });

  fetch(util.newRequest('GET', '/user', {
    // username: username // TODO: trenger brukernavn får å vite hvem som er logget inn, for å kunne gjøre endringer
  }))
    .then((res) => {
      return res.json();
	  })
    .then((data) => {
      setting.updateData(data);
    })
    .catch((err) => {
      util.printError(err);

      settings.updateData(data()); // TODO: Remove later
    });

}//===========================================
initialize();
