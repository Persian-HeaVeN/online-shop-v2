export function ChangeProfile(id: number, update: Function, session: any) {
	if (!session) {
		return false;
	}
	let siteinfos = session?.user?.siteinfo;

	console.log(siteinfos);

	siteinfos = { ...siteinfos, profile: id };

    console.log(siteinfos);

	//update({ siteinfo: siteinfos });
}
