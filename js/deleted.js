(function() {
  function onDeleteButtonClick(event) {
    var isAlreadyOpen = isOpen(event.target);
    toggleClass(event.target, 'is-open');

    if (isAlreadyOpen) {
      var dropdown = getClosestDropdown(event.target);
      if (dropdown) {
        dropdown.parentNode.className = dropdown.parentNode.className.replace('is-open', '');
      }
    } else {
      event.target.appendChild(createDropdown());
    }
  }

  function toggleClass(elem, className) {
    if (isOpen(elem)) {
      elem.className = elem.className.replace(className, '');
    } else {
      elem.className += ' ' + className;
    }
  }

  function isOpen(elem) {
    if (elem.getAttribute('data-delete')) {
      return elem.className.indexOf('is-open') > -1; 
    } else {
      return true;
    }
  }

  function getClosestDropdown(elem) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if (elem.classList.contains('dropdown') ) {
         return elem;
      }
    }

    return false;
  }

  function createDropdown(deletePrompt, cancelText, confirmText) {
    deletePrompt = deletePrompt || 'Are you sure you want to delete this?';
    cancelText = cancelText || 'Cancel';
    confirmText = confirmText || 'Confirm';

    var dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.appendChild(
      document.createTextNode(deletePrompt)
    );

    var actions = document.createElement('div');
    actions.className = 'actions';

    var cancelBtn = document.createElement('span');
    cancelBtn.className = 'btn--link btn--sm';
    cancelBtn.appendChild(
      document.createTextNode(cancelText)
    );

    var confirmBtn = document.createElement('span');
    confirmBtn.className = 'btn--red btn--sm';
    confirmBtn.appendChild(
      document.createTextNode(confirmText)
    )

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    dropdown.appendChild(actions);

    return dropdown;
  }

  var buttons = document.querySelectorAll('[data-delete]');

  [].forEach.call(buttons, function(button) {
    button.addEventListener('click', onDeleteButtonClick, false);
  });
}());