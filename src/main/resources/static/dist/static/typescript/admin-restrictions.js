"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let selectedRestrictionID;
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Restriction editor loaded");
        yield loadRestrictionList();
        addRestrictionClosePopupListener();
        addRestrictionConfirmEditListener();
        addRestrictionButtonEventListener();
    });
});
function getHtmlForRestriction(restriction) {
    return `
            <div class="adminTableEntry">
                <a class="RestrictionEntryName">` + restriction.name + `</a> 
                <div class="adminTableEditButton" id="EditRestrictionButton` + restriction.id + `">
                </div>
            </div>
        `;
}
function fetchRestrictions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8080/api/allBeschraenkungen');
            return yield response.json();
        }
        catch (error) {
            console.error('Error fetching restrictions:', error);
            return [];
        }
    });
}
function updateRestrictionList(restrictionList) {
    return __awaiter(this, void 0, void 0, function* () {
        const restrictions = yield fetchRestrictions();
        console.log(restrictions);
        let innerHtml = "";
        restrictions.forEach(restriction => {
            innerHtml += getHtmlForRestriction(restriction);
        });
        restrictionList.innerHTML = innerHtml;
        addRestrictionEventListeners(restrictions);
    });
}
function addRestrictionButtonEventListener() {
    const restrictionListPopup = document.getElementById("EditRestrictionListPopup");
    const popupTitle = document.getElementById("RestrictionEditPopupTitle");
    const popupName = document.getElementById("RestrictionEditNameText");
    const body = document.body;
    if (!restrictionListPopup || !popupTitle)
        return;
    const addRestrictionButton = document.getElementById("addRestrictionButton");
    if (!addRestrictionButton)
        return;
    addRestrictionButton.addEventListener("click", function () {
        restrictionListPopup.style.display = "flex";
        body.classList.add("no-scroll");
        popupTitle.textContent = "Add new Restriction";
        popupName.value = "";
        selectedRestrictionID = 0;
    });
}
function addRestrictionEventListeners(restrictions) {
    const restrictionListPopup = document.getElementById("EditRestrictionListPopup");
    const popupTitle = document.getElementById("RestrictionEditPopupTitle");
    const popupName = document.getElementById("RestrictionEditNameText");
    const body = document.body;
    console.log(restrictions);
    if (!restrictionListPopup || !popupTitle)
        return;
    for (let i = 1; i <= restrictions.length; i++) {
        const editButton = document.getElementById("EditRestrictionButton" + i);
        if (editButton) {
            editButton.addEventListener("click", function () {
                restrictionListPopup.style.display = "flex";
                body.classList.add("no-scroll");
                popupTitle.textContent = "Edit " + restrictions[i - 1].name;
                popupName.value = restrictions[i - 1].name;
                selectedRestrictionID = i;
            });
        }
    }
}
function loadRestrictionList() {
    return __awaiter(this, void 0, void 0, function* () {
        const restrictionList = document.getElementById("RestrictionListContent");
        if (restrictionList) {
            yield updateRestrictionList(restrictionList);
        }
    });
}
function addRestrictionClosePopupListener() {
    const closePopupButton = document.getElementById("CloseEditRestrictionListPopup");
    const restrictionListPopup = document.getElementById("EditRestrictionListPopup");
    if (closePopupButton && restrictionListPopup) {
        closePopupButton.addEventListener("click", function () {
            closeRestrictionPopup();
        });
    }
}
function closeRestrictionPopup() {
    const restrictionListPopup = document.getElementById("EditRestrictionListPopup");
    const body = document.body;
    if (!restrictionListPopup || !body)
        return;
    restrictionListPopup.style.display = "none";
    body.classList.remove("no-scroll");
}
function addRestrictionConfirmEditListener() {
    const confirmEditButton = document.getElementById("restrictionConfirmEditButton");
    if (confirmEditButton) {
        confirmEditButton.addEventListener("click", function () {
            const popupTitle = document.getElementById("RestrictionEditNameText");
            if (!popupTitle)
                return;
            let restrictionData = {
                id: selectedRestrictionID,
                name: popupTitle.value,
            };
            let jsonDataString = JSON.stringify(restrictionData);
            console.log(jsonDataString);
            fetch("http://localhost:8080/api/sendBeschraenkungUpdate", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: jsonDataString
            })
                .then(response => {
                console.log(response);
                loadRestrictionList();
                closeRestrictionPopup();
            })
                .then(data => {
                console.log("Successfully transmitted data: ", data);
            })
                .catch(error => {
                console.log("Error transmitting data: ", error);
            });
        });
    }
}
