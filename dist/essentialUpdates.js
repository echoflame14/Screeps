module.exports = {
	run: function () {
		let sites = Game.rooms["W35N52"].find(FIND_CONSTRUCTION_SITES);
		let sortedSites = {
			road: 0,
			extension: 0,
			tower: 0
		};
		for (let x in sites) {
			switch (sites[x].structureType) {
			case 'road':
				sortedSites.road++;
				break;
			case 'tower':
				sortedSites.tower++;
				break;
			case 'extension':
				sortedSites.extension++;
				break;
			default:
			}

		}
		let returnText = ["sites left:    roads-" + sortedSites.road, "    extensions-", sortedSites.extension, "    towers-", sortedSites.tower];
		console.log(returnText);

	}
};
