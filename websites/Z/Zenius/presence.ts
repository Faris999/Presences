const presence = new Presence({
		clientId: "895451776977862687",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "general.browsing"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let tutor: string, title: string, time: string;

const getSection = async (presenceData: PresenceData) => {
	const breadcrumb = document.querySelector(".breadcrumb ol");
	const video = document.querySelector("video");
	if (document.location.pathname.includes('live-class') && document.location.search.includes('session')) {

		
		presenceData.details = title;
		presenceData.state = `Tutor: ${tutor}`;
		presenceData.startTimestamp = Math.floor(Date.now() / 1000) - presence.timestampFromFormat(time);
		return presenceData;
	}
	if (breadcrumb == null) {
		presenceData.details = (await strings).browsing;
		return presenceData;
	}
	
	if (video != null) {
		const sectionTitle = document.querySelector('h2').textContent;
		const videoTitle = document.querySelector('h4.c-znet-main-video-title').textContent;
		presenceData.details = sectionTitle;
		presenceData.state = videoTitle;
		const timestamps = presence.getTimestampsfromMedia(video);
		presenceData.startTimestamp = timestamps[0];
		presenceData.endTimestamp = timestamps[1];
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		return presenceData;
	}
	presenceData.details = breadcrumb.children[breadcrumb.children.length - 1].textContent;
	return presenceData;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "zlogo",
		startTimestamp: browsingTimestamp,
		buttons: [
			{
				label: "Open",
				url: document.location.href
			},
		]
	};


	getSection(presenceData);
	presence.setActivity(presenceData);
});

presence.on('iFrameData', (data: {title: string, tutor: string, time: string}) => {
	title = data.title;
	tutor = data.tutor;
	time = data.time;
})