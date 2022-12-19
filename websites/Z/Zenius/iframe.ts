const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	//Get all the data you need out of the iFrame save them in variables and then send them using iframe.send

	const title = document.querySelector("h4.text-capitalize").textContent;
	const tutor = document.querySelector("span.user_name").textContent;
	const time = document.querySelector("h4.time").textContent;
    console.log(title, tutor, time)
	iframe.send({
		title: title,
        tutor: tutor,
        time: time,
	});
});
