
export function ChangeProfile(id: number, update: Function, session: any) {
	if (!session) {
		return false;
	}
	let siteinfos = session?.user?.siteinfo;

	siteinfos = { ...siteinfos, profile: id };

	update({ siteinfo: siteinfos });
}

