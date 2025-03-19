import type { SVGProps } from "react";
import React from "react";
import useUserStore from "../store/user.store";
import { toast } from "sonner";
import { useFetch } from "../api.service";
import { ListGroup } from "react-bootstrap";

const refOrigin = "https://dashmeafrica.com/register?ref=";

export default function MyReferrals() {
	const user = useUserStore((st) => st.user);
	const setRefID = useUserStore((st) => st.updateRefID);

	async function genLink() {
		const res = await useFetch<string>("/users/generate-refID");

		if (!res.ok) return toast.error(res.message);

		toast.success(res.message);
		setRefID(res.data);
	}
	function copyLink() {
		navigator.clipboard.writeText(`${refOrigin}${user?.refID}`).then(
			() => toast.info("Link copied"),
			(err) => {}
		);
	}
	return (
		<div className="px-5">
			<h4 className="text-success mb-3">Referral</h4>
			<div className="relative flex flex-row items-center">
				<input
					type="text"
					value={user?.refID ? `${refOrigin}${user?.refID}` : ""}
					className="border border-[#1d4ed8] text-[#1d4ed8] rounded-md w-full focus:border-2 outline-none py-2 px-3"
					readOnly
				/>
				{user?.refID ? (
					<span onClick={copyLink} className="cursor-pointer px-2">
						<MynauiCopy className="text-[#1d4ed8]" />
					</span>
				) : (
					<span
						onClick={genLink}
						className="cursor-pointer px-2 absolute right-2 top-2 flex flex-row gap-1"
					>
						Generate link
						<BxRefresh className="animate-" />
					</span>
				)}
			</div>

			<div className="mt-4">
				<h4 className="mb-3">My Referrals</h4>
				{!!user?.referrals.length ? (
					<ListGroup>
						{user.referrals.map((usr) => (
							<ListGroup.Item>{usr.username}</ListGroup.Item>
						))}
					</ListGroup>
				) : (
					<div>No Referrals</div>
				)}
			</div>
		</div>
	);
}

export function MynauiCopy(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M20.829 12.861c.171-.413.171-.938.171-1.986s0-1.573-.171-1.986a2.25 2.25 0 0 0-1.218-1.218c-.413-.171-.938-.171-1.986-.171H11.1c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C7.5 9.209 7.5 9.839 7.5 11.1v6.525c0 1.048 0 1.573.171 1.986c.229.551.667.99 1.218 1.218c.413.171.938.171 1.986.171s1.573 0 1.986-.171m7.968-7.968a2.25 2.25 0 0 1-1.218 1.218c-.413.171-.938.171-1.986.171s-1.573 0-1.986.171a2.25 2.25 0 0 0-1.218 1.218c-.171.413-.171.938-.171 1.986s0 1.573-.171 1.986a2.25 2.25 0 0 1-1.218 1.218m7.968-7.968a11.68 11.68 0 0 1-7.75 7.9l-.218.068M16.5 7.5v-.9c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.983-.984C14.79 3 14.16 3 12.9 3H6.6c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C3 4.709 3 5.339 3 6.6v6.3c0 1.26 0 1.89.245 2.371c.216.424.56.768.984.984c.48.245 1.111.245 2.372.245H7.5"
			></path>
		</svg>
	);
}

export function BxRefresh(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="#000"
				d="M10 11H7.101l.001-.009a5 5 0 0 1 .752-1.787a5.05 5.05 0 0 1 2.2-1.811q.455-.193.938-.291a5.1 5.1 0 0 1 2.018 0a5 5 0 0 1 2.525 1.361l1.416-1.412a7 7 0 0 0-2.224-1.501a7 7 0 0 0-1.315-.408a7.1 7.1 0 0 0-2.819 0a7 7 0 0 0-1.316.409a7.04 7.04 0 0 0-3.08 2.534a7 7 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4zm4 2h2.899l-.001.008a4.98 4.98 0 0 1-2.103 3.138a4.9 4.9 0 0 1-1.787.752a5.1 5.1 0 0 1-2.017 0a5 5 0 0 1-1.787-.752a5 5 0 0 1-.74-.61L7.05 16.95a7 7 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.1 7.1 0 0 0 2.818 0a7.03 7.03 0 0 0 4.395-2.945a7 7 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4z"
			></path>
		</svg>
	);
}
