import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
{
	title: "Home",
	path: "/",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,
},
{
	title: "Dashboard",
	icon: <FaIcons.FaEnvelopeOpenText />,
	path: '/dashboard',
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

},
{
	title: "Explore",
	icon: <FaIcons.FaEnvelopeOpenText />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Choose-specific-body-exercise",
		path: "/explore/explore1",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "new added",
		path: "/explore/explore2",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Package",
		path: "/explore/explore3",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "all exercise",
		path: "/explore/explore4",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Contribute",
	icon: <IoIcons.IoMdHelpCircle />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
		{
			title: "Perform Standard",
			path: "/contribute/contribute1",
			icon: <IoIcons.IoIosPaper />,
		},
		{
			title: "Report",
			path: "/contribute/contribute2",
			icon: <IoIcons.IoIosPaper />,
		},
	],

},
{
	title: "Add exercise",
	icon: <IoIcons.IoMdHelpCircle />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
		{
			title: "New addition",
			path: "/addexercise/addexercise1",
			icon: <IoIcons.IoIosPaper />,
		},
		{
			title: "Recommend",
			path: "/addexercise/addexercise2",
			icon: <IoIcons.IoIosPaper />,
		},
	],

},
{
	title: "Contact",
	path: "/contact",
	icon: <FaIcons.FaPhone />,
},
];
