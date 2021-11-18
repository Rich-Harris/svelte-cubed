export type Section = {
	key: string;
	slug: string;
	title: string;
	sections: SubSection[];
};

type SubSection = {
	title: string;
	slug: string;
	sections: SubSubSection[];
};

type SubSubSection = {
	title: string;
	slug: string;
};
