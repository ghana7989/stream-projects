import axios from 'axios';

const url = 'https://jooble.org/api/';
const key = '0183c9aa-1515-428b-897d-20868825b3bf';
const requiredUrl = `${url}${key}`;

const locationInput = document.getElementById('location');
const keywordsInput = document.getElementById('keywords');
const button = document.getElementById('button');
const jobListing = document.querySelector('#job-listing');

button.addEventListener('click', (e) => {
	jobListing.innerHTML = '';
	e.preventDefault();
	const location = locationInput.value;
	const keywords = keywordsInput.value;
	if (!location) {
		alert('Brooo please enter location it is important');
		return;
	}
	axios
		.post(requiredUrl, {
			keywords,
			location,
		})
		.then((response) => {
			console.log(response.data);
			const jobs = response.data.jobs;
			const totalJobs = response.data.totalCount;
			for (let i = 0; i < jobs.length; i++) {
				const job = jobs[i];
				const jobTitle = job.title;
				const location = job.location;
				const link = job.link;
				const temp = `
<h1>${jobTitle}</h1>
        <span>${location}</span>
        <a href="${link}" 
          target="_blank"
        >Link to JD</a>
        `;
				jobListing.innerHTML += temp;
			}
		});
});
/**
 * {
    "title": "Software Engineer",
    "location": "India",
    "snippet": "&nbsp;...Role: Software <b>Engineer </b>(Mulesoft) About Acquia: \r\n Acquia empowers the world’s most ambitious brands to create digital customer experiences that matter. With open source Drupal at its core, the Acquia Digital Experience Platform (DXP) enables marketers, developers, and...&nbsp;",
    "salary": "",
    "source": "builtin.com",
    "type": "",
    "link": "https://jooble.org/desc/-6957375894526202970?ckey=Engineering&rgn=55126&pos=1&elckey=-5334400241597251265&p=1&aq=-7145588200449148306&cid=2247&jobAge=34&relb=157&brelb=115&bscr=2117.7644&scr=2891.208789565217",
    "company": "Acquia",
    "updated": "2022-11-13T04:39:15.7820007+00:00",
    "id": -6957375894526203000
}
 */
