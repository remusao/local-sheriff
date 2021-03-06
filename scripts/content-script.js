/*
	We need to capture data being entered in the input fields and check it was shared with trackers.
*/

// Check cases like: https://www.swm.de/privatkunden/mein-swm/zaehlerstand#/
// Other issues where it's autocompleted. Only partial results are shown.
// Check what all information needs to be saved.
// Also breaks when fields are auto-filled.
console.log(">>> Console ");
function getDetails(ele) {
	const objDetails = {
		id: ele.id,
		cn: ele.className
	}

	console.log(">>>>>>... " + ele.className);
	return objDetails;
};

function loadListeners(evt){
	const forms = document.forms;
	for (let i=0;i<forms.length;i++) {
		const form = forms[i];
		document.forms[i].addEventListener("blur", function( event ) {
			// We should generally avoid saving passwords. // May be not save it but just check and notify it to the user.
			console.log(event.srcElement);
			if (event.srcElement.type !== 'password') {
				console.log(event.srcElement.value);

				const value = event.srcElement.value;
				const additionalInfo = {
					type: 'inputFields',
					details: {},
					value
				}
				chrome.runtime.sendMessage(additionalInfo);
			}
		}, true);
	}

	// Let's also try and get the already populated values.
	// This is too aggressive.
	// Commenting it out.

	/*
	Array.prototype.slice.call(document.querySelectorAll('form input')).forEach(e => {
		console.log(e.value);
		if (e.type === 'text' || e.type === 'password' || e.type === 'hidden') {
			const value = e.value;
			const additionalInfo = {
				type: 'inputFields',
				details: {},
				value
			}
			chrome.runtime.sendMessage(additionalInfo);
		}
	});
	*/
};

// If there is a neat way to detect dom load finished, that would be preferrered.
window.setTimeout(loadListeners, 2500);