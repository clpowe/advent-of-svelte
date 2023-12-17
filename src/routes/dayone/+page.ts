export const load = async ({ fetch }) => {
	const getChildren = async () => {
		const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		const children = await res.json();

		children.forEach((child) => {
			child.id = crypto.randomUUID();
		});

		console.log(children);

		return children;
	};
	return {
		children: getChildren()
	};
};
