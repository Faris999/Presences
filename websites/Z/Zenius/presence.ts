const presence = new Presence({
		clientId: "895451776977862687",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Zenius",
		state: "Zenius",
		largeImageKey: "zlogo"
	};

	console.log('hello zenius')
	presence.setActivity(presenceData);
});
