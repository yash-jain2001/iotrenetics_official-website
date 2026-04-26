import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";

const AutomationMenu = ({ closeMobileMenu }) => {
  // Desktop State
  const [anchorEl, setAnchorEl] = useState(null);

  // Mobile State
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const navigate = useNavigate();

  // Desktop Menu Booleans
  const open = Boolean(anchorEl);

  const handleDesktopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDesktopClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (path) => {
    handleDesktopClose();
    if (closeMobileMenu) closeMobileMenu();
    navigate(path);
  };

  return (
    <div className="w-full h-full">
      {/* ======================= */}
      {/* DESKTOP VERSION         */}
      {/* ======================= */}
      <div className="hidden md:flex items-center h-full">
        <div
          className="flex items-center gap-1 no-underline text-gray-800 font-medium transition-colors duration-300 hover:text-blue-600 cursor-pointer"
          onClick={handleDesktopClick}
          aria-controls={open ? "products-menu-desktop" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <span>Automation</span>
        </div>

        <Menu
          id="products-menu-desktop"
          anchorEl={anchorEl}
          open={open}
          onClose={handleDesktopClose}
          disableScrollLock={true}
          className="mt-2"
          PaperProps={{ sx: { minWidth: "180px" } }}
        >
          <MenuItem
            onClick={() => navigateTo("/home-automation")}
            sx={{
              fontSize: "15px",
              color: "#374151",
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <span>Home Automation</span>
          </MenuItem>
          <MenuItem
            onClick={() => navigateTo("/office-automation")}
            sx={{
              fontSize: "15px",
              color: "#374151",
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <span>Office Automation</span>
          </MenuItem>
        </Menu>
      </div>

      {/* ======================= */}
      {/* MOBILE VERSION          */}
      {/* ======================= */}
      <div className="md:hidden w-full">
        <List sx={{ width: "100%", p: 0 }}>
          <ListItemButton
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: 2,
              "&:hover": { bgcolor: "#f9fafb" },
            }}
          >
            <ListItemText
              primary="Automation"
              primaryTypographyProps={{
                fontWeight: 500,
                color: "#1f2937",
                textAlign: "center",
              }}
            />
            {mobileProductsOpen ? (
              <ExpandLess sx={{ color: "#4F46E5", ml: 1 }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ ml: 1 }} />
            )}
          </ListItemButton>

          <Collapse in={mobileProductsOpen} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                pl: 2,
                borderLeft: "2px solid #f3f4f6",
                ml: 3,
                mt: 1,
                mb: 2,
              }}
            >
              <ListItemButton
                sx={{
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
                onClick={() => navigateTo("/home-automation")}
              >
                <ListItemText
                  primary="Home Automation"
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#4B5563",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
                onClick={() => navigateTo("/office-automation")}
              >
                <ListItemText
                  primary="Office Automation"
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#4B5563",
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default AutomationMenu;
