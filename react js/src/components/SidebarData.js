// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { GiDigitalTrace } from "react-icons/gi";

export const SidebarData = [
	{
		title: "Assets",
		path: "/assets",
		icon: <GiDigitalTrace />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Manage Assets",
				path: "/assets/manageAssets",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
		],
	},
	{
		title: "Register",
		path: "/empRegister",
		icon: <FaIcons.FaRegistered />,
	},
	{
		title: "Employees",
		path: "/employee",
		icon: <FaIcons.FaUser />,
	},
	{
		title: "Project",
		path: "/projects",
		icon: <FaIcons.FaProjectDiagram />,
	}
];
