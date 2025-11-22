

export const Navbar = () => {
  return (
		<nav className="p-6 flex justify-between border-b border-zinc-800 mx-auto max-w-5xl">
			<div className="flex gap-4 items-center">
				<img src="" alt="" className="h-[40px] w-[40px] bg-fuchsia-950 rounded-full" />
				<div>
					<h4 className="font-semibold text-lg">Manni</h4>
					<p className="text-sm">FID: 1120583</p>
				</div>
			</div>

			<button className="border border-zinc-700 px-3 rounded-2xl flex items-center ">
				<p className="flex gap-4 font-bold items-center">
					<span className="bg-white p-1 px-3.5 rounded-full text-black">i</span>
					INFO
				</p>
			</button>
		</nav>
	);
}
