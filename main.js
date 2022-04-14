const showFormBtn = document.querySelector('#show-form-btn');
showFormBtn.addEventListener('click', (e) => {
    showPrompt("Введите что-нибудь<br>...умное :)", function (value) {
        alert(value);
    });
});

function showPrompt(html, callback) {
    const promptMsg = document.querySelector('#prompt-message');
    promptMsg.innerHTML = html;

    const promptForm = document.querySelector('#prompt-form');
    promptForm.text.value = '';

    addEvents(callback);
    togglePromptForm();

    const firstElem = promptForm.elements[0];
    firstElem.focus();
}

function togglePromptForm() {
    const promptFormContainer = document.querySelector('#prompt-form-container');
    promptFormContainer.toggleAttribute('hidden');
}

function addEvents(callback) {
    const promptForm = document.querySelector('#prompt-form');
    promptForm.onsubmit = (e) => {
        e.preventDefault();
        const { value } = promptForm.text;

        if (!value)
            return false;

        postResult(value);
    };

    promptForm.onreset = (e) => {
        e.preventDefault();
        postResult();
    };

    //---------------------------------

    document.onkeydown = function (e) {
        if (e.key == 'Escape')
            postResult();
    };

    //---------------------------------

    function postResult(value) {
        togglePromptForm();
        callback(value || 'null');
        removeEvents();
    }

    //---------------------------------

    const firstElem = promptForm.elements[0];
    firstElem.onkeydown = function (e) {
        if (e.key == 'Tab' && e.shiftKey) {
            lastElem.focus();
            return false;
        }
    };

    const lastElem = promptForm.elements[promptForm.elements.length - 1];
    lastElem.onkeydown = function (e) {
        if (e.key == 'Tab' && !e.shiftKey) {
            firstElem.focus();
            return false;
        }
    };
}

function removeEvents() {
    document.onkeydown = null;
}
