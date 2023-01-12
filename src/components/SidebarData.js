import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
{
	title: "About Us",
	path: "/about-us",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Our Aim",
		path: "/about-us/aim",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Our Vision",
		path: "/about-us/vision",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Services",
	path: "/services",
	icon: <IoIcons.IoIosPaper />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Service 1",
		path: "/services/services1",
		icon: <IoIcons.IoIosPaper />,
		cName: "sub-nav",
	},
	{
		title: "Service 2",
		path: "/services/services2",
		icon: <IoIcons.IoIosPaper />,
		cName: "sub-nav",
	},
	{
		title: "Service 3",
		path: "/services/services3",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Dashboard",
	path: "/dashboard",
	icon: <FaIcons.FaEnvelopeOpenText />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Ongoing-exercises",
		path: "/dashboard/dashboard1",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Upcoming-exercises",
		path: "/dashboard/dashboard2",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Past-exercises",
		path: "/dashboard/dashboard3",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Recoomended-exercises",
		path: "/dashboard/dashboard4",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Explore",
	path: "/explore",
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
	path: "/contribute",
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
	path: "/addexercise",
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
	title: "Analysis",
	path: "/analysis",
	icon: <IoIcons.IoMdHelpCircle />,
},
{
	title: "Contact",
	path: "/contact",
	icon: <FaIcons.FaPhone />,
},
];
