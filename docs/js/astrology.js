// Used by the astrology SOS page to display today's readings

// what is today's zodiac sign?
function getZodiacSign(date) {
    const month = date.getMonth();
    const day = date.getDate();
    // Array containing the zodiac signs and their start dates
    const signs = [
        { "sign": "Capricorn", "startDay": 20, "element": "Earth" }, // Dec 22 - Jan 19
        { "sign": "Aquarius", "startDay": 19, "element": "Air" },     // Jan 20 - Feb 18
        { "sign": "Pisces", "startDay": 19, "element": "Water" },    // Feb 19 - Mar 20
        { "sign": "Aries", "startDay": 21, "element": "Fire" },      // Mar 21 - Apr 19
        { "sign": "Taurus", "startDay": 20, "element": "Earth" },    // Apr 20 - May 20
        { "sign": "Gemini", "startDay": 21, "element": "Air" },      // May 21 - Jun 20
        { "sign": "Cancer", "startDay": 22, "element": "Water" },    // Jun 21 - Jul 22
        { "sign": "Leo", "startDay": 23, "element": "Fire" },        // Jul 23 - Aug 22
        { "sign": "Virgo", "startDay": 23, "element": "Earth" },     // Aug 23 - Sep 22
        { "sign": "Libra", "startDay": 23, "element": "Air" },       // Sep 23 - Oct 22
        { "sign": "Scorpio", "startDay": 23, "element": "Water" },   // Oct 23 - Nov 21
        { "sign": "Sagittarius", "startDay": 22, "element": "Fire" } // Nov 22 - Dec 21
    ];

    // Determine the zodiac sign
    let signIndex = month;
    if (day < signs[month].startDay) {
        signIndex = (month - 1 + 12) % 12;
    }
    return signs[signIndex];
}

// are we within a month of the given date
function isNearDate(month, day) {
    const today = new Date();
    const year = today.getFullYear();
    const targetDate = new Date(year, month, day);
    const monthBefore = new Date(targetDate);
    monthBefore.setMonth(targetDate.getMonth() - 1);
    const monthAfter = new Date(targetDate);
    monthAfter.setMonth(targetDate.getMonth() + 1);

    return today >= monthBefore && today <= monthAfter;
}

// to display all possible message
let isEverythingDisplayed = false;
function toggleVisibility() {
    const elements = document.querySelectorAll('.invisible');
    if (!isEverythingDisplayed) {
        // reveal everything
        elements.forEach(el => el.style.display = 'block');
        document.getElementById('toggle-link').innerText = 'Hide again.';
        isEverythingDisplayed = true;
    } else {
        // hide everything
        elements.forEach(el => el.style.display = 'none');
        document.getElementById('toggle-link').innerText = 'Display all possible events.';
        isEverythingDisplayed = false;
        // insure today's messages are visible
        displayTodaysMessage();
    }
}

// to display the long versions of the readings
let areReadingsLong = false;
function toggleReadingLength() {
    const long_elements = document.querySelectorAll('.long-reading');
    const short_elements = document.querySelectorAll('.short-reading');
    if (areReadingsLong) {
        // switch to short readings
        long_elements.forEach(el => el.style.display = 'none');
        short_elements.forEach(el => el.style.display = 'block');
        document.getElementById('toggle-length').innerText = 'Switch to long readings.';
        areReadingsLong = false;
    }
    else {
        // switch to long readings
        long_elements.forEach(el => el.style.display = 'block');
        short_elements.forEach(el => el.style.display = 'none');
        document.getElementById('toggle-length').innerText = 'Switch to short readings.';
        areReadingsLong = true;
    }
}

// names for the various moon phases
const moonPhases = ["New", "Waxing", "Full", "Waning"]

// "Indian" full moon names according to the Farmer's almanach
// https://en.wikipedia.org/wiki/Full_moon#Full_moon_names
const fullMoonNames = {
    "January": "Wolf Moon, Old Moon, Moon After Yule, or Winter Moon",
    "February": "Snow Moon, Hunger Moon, or Storm Moon",
    "March": "Worm Moon, Crow Moon, Sap Moon, Crust Moon, Lenten Moon, or Wind Moon",
    "April": "Pink Moon, Seed Moon, Sprouting Grass Moon, Fish Moon, Frog Moon, Spring Moon, Awakening Moon, or Sap Moon",
    "May": "Flower Moon, Milk Moon, Corn Planting Moon, Grass Moon, or Mother's Moon",
    "June": "Strawberry Moon, Mead Moon, Rose Moon, Hot Moon, or Thunder Moon",
    "July": "Buck Moon, Hay Moon, Elk Moon, Summer Moon, or Thunder Moon",
    "August": "Sturgeon Moon, Red Moon, Corn Moon, Dog Moon, Barley, Green Corn, Herb, or Grain Moon",
    "September": "Harvest Moon, Full Corn Moon, Fruit Moon, or Barley Moon",
    "October": "Hunters' Moon, Autumn Moon, Pumpkin Moon, Dying Moon, Blood or Sanguine Moon",
    "November": "Beaver Moon, Frosty Moon, or Dark Moon",
    "December": "Big Moon, Cold Moon, Oak Moon, or Long Night's Moon"
};

// default location
var user_location = { latitude: 37.7749, longitude: -122.4194 }; // San Francisco

// returns a promise pointing to the user's location
function setUserLocation() {
    console.log("LOCATED!")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                user_location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                displayTodaysMessage();
            },
            () => { }
        );
    }
}

// pick what messages to display based on today's date
async function displayTodaysMessage() {
    // data for the filling
    // where
    const latitude = user_location.latitude;
    const longitude = user_location.longitude;
    // time
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    // Create an ephemeris instance for all specified celestial bodies
    // this does our moon phse and retrograde planets computations
    // https://github.com/0xStarcat/Moshier-Ephemeris-JS/tree/master
    const ephemeris = new Ephemeris.default({
        key: ['moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'],
        year, month, day, hours, minutes,
        latitude, longitude,
        calculateShadows: false
    });

    // introductory message
    const zodiac = getZodiacSign(now);
    const month_name = now.toLocaleString('default', { month: 'long' });
    const message = `Today is the <em>${day} of ${month_name}</em>, we are currently in <em>${zodiac.sign}</em> (<em>${zodiac.element}</em> sign).`;
    document.getElementById('introductory-message').innerHTML = message; // Use innerHTML since we're including HTML tags

    // lunar and zodiac message
    const moon_phase_index = ephemeris.Results[0].position.phaseQuarter
    const moon_phase = moonPhases[moon_phase_index];
    const moon_Id = `${zodiac.sign.toLowerCase()}-${moon_phase.toLowerCase()}-message`;
    document.getElementById(moon_Id).style.display = 'block';
    // deal with full moon
    if (moon_phase == 'Full') {
        document.getElementById('full-moon-message').style.display = 'block';
        document.getElementById('full-moon-message').innerHTML = `This full moon is also known as the <em><a href="https://en.wikipedia.org/wiki/Full_moon#Full_moon_names" target="_blank">${fullMoonNames[month_name]}</a></em>.`;
    }

    // solstice and equinox messages
    if (isNearDate(11, 21)) { // Winter Solstice around December 21
        document.getElementById('winter-solstice-message').style.display = 'block';
    }
    if (isNearDate(5, 21)) { // Summer Solstice around June 21
        document.getElementById('summer-solstice-message').style.display = 'block';
    }
    if (isNearDate(2, 20)) { // Spring Equinox around March 20
        document.getElementById('spring-equinox-message').style.display = 'block';
    }
    if (isNearDate(8, 22)) { // Autumn Equinox around September 22
        document.getElementById('autumn-equinox-message').style.display = 'block';
    }

    // Update retrograde messages
    ephemeris.Results.forEach(body => {
        if (body.motion && body.motion.isRetrograde) {
            const elementId = `${body.key}-retrograde-message`;
            document.getElementById(elementId).style.display = 'block';
        }
    });
}

// add information on the page
document.addEventListener('DOMContentLoaded', (event) => {
    displayTodaysMessage();
});