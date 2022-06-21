import React from "react";
import "./Sidebar.css";
import LogoImage from '../../images/CG.gif_p50.gif';
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

const Sidebar = () => {
  return <>

    <div className="sidebar">
        <Link to="/">
            <img src={LogoImage} alt="E-Commerce" />
        </Link>
        <Link to="/dashboard">
            <p>
                <DashboardIcon />Dashboard
            </p>
        </Link>
        <Link to="#">
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ImportExportIcon />}
            >
                <TreeItem nodeId="1" label="Products">
                    <Link to="/seller/products">
                        <TreeItem nodeId="2" label="ALL" icon={<PostAddIcon />} />
                    </Link>

                    <Link to="/seller/product">
                        <TreeItem nodeId="3" label="create" icon={<AddIcon />} />
                    </Link>

                </TreeItem>
            </TreeView>
        </Link>
        <Link to="/seller/orders">
            <p>
                <ListAltIcon /> Orders
            </p>
        </Link>
    </div>
  </>;
};

export default Sidebar;
