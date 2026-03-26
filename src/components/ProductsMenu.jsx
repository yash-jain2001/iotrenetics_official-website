import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const ProductsMenu = ({ closeMobileMenu }) => {
  // Desktop State
  const [anchorEl, setAnchorEl] = useState(null);
  const [softAnchorEl, setSoftAnchorEl] = useState(null);
  const [hardAnchorEl, setHardAnchorEl] = useState(null);
  
  // Mobile State
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSoftOpen, setMobileSoftOpen] = useState(false);
  const [mobileHardOpen, setMobileHardOpen] = useState(false);
  
  const navigate = useNavigate();

  // Desktop Menu Booleans
  const open = Boolean(anchorEl);
  const softOpen = Boolean(softAnchorEl);
  const hardOpen = Boolean(hardAnchorEl);

  const handleDesktopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleDesktopClose = () => {
    setAnchorEl(null);
    setSoftAnchorEl(null);
    setHardAnchorEl(null);
  };

  const navigateTo = (path) => {
    handleDesktopClose();
    if (closeMobileMenu) closeMobileMenu();
    navigate(path);
  };

  const handleSoftEnter = (e) => {
    setSoftAnchorEl(e.currentTarget);
    setHardAnchorEl(null);
  };

  const handleHardEnter = (e) => {
    setHardAnchorEl(e.currentTarget);
    setSoftAnchorEl(null);
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
          aria-controls={open ? 'products-menu-desktop' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <span>Products</span>
        </div>

        <Menu
          id="products-menu-desktop"
          anchorEl={anchorEl}
          open={open}
          onClose={handleDesktopClose}
          disableScrollLock={true}
          className="mt-2"
        >
          <MenuItem 
            onMouseEnter={handleSoftEnter}
            sx={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontWeight: 500, color: '#374151', bgcolor: softOpen ? 'rgba(0,0,0,0.04)' : 'transparent' }}
          >
            Software Products <KeyboardArrowRightIcon fontSize="small" sx={{ color: '#9CA3AF' }} />
          </MenuItem>
          
          <MenuItem 
            onMouseEnter={handleHardEnter}
            sx={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontWeight: 500, color: '#374151', bgcolor: hardOpen ? 'rgba(0,0,0,0.04)' : 'transparent' }}
          >
            Hardware Products <KeyboardArrowRightIcon fontSize="small" sx={{ color: '#9CA3AF' }} />
          </MenuItem>
        </Menu>

        {/* Software Nested Menu (Desktop) */}
        <Menu
          anchorEl={softAnchorEl}
          open={softOpen}
          onClose={() => setSoftAnchorEl(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          disableScrollLock={true}
          PaperProps={{ sx: { ml: 0.5, minWidth: '180px' } }}
        >
          <MenuItem onClick={() => navigateTo('/finexa')} sx={{ fontSize: '14px', color: '#4B5563' }}>Finexa</MenuItem>
          <MenuItem onClick={() => navigateTo('/healnet')} sx={{ fontSize: '14px', color: '#4B5563' }}>HealNet</MenuItem>
        </Menu>

        {/* Hardware Nested Menu (Desktop) */}
        <Menu
          anchorEl={hardAnchorEl}
          open={hardOpen}
          onClose={() => setHardAnchorEl(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          disableScrollLock={true}
          PaperProps={{ sx: { ml: 0.5, minWidth: '220px' } }}
        >
          <MenuItem onClick={() => navigateTo('/coming-soon')} sx={{ fontSize: '14px', color: '#4B5563' }}>Hardware Product 1</MenuItem>
          <MenuItem onClick={() => navigateTo('/coming-soon')} sx={{ fontSize: '14px', color: '#4B5563' }}>Hardware Product 2</MenuItem>
        </Menu>
      </div>

      {/* ======================= */}
      {/* MOBILE VERSION          */}
      {/* ======================= */}
      <div className="md:hidden w-full">
        <List sx={{ width: '100%', p: 0 }}>
          <ListItemButton 
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)} 
            sx={{ py: 1.5, px: 2, borderRadius: 2, '&:hover': { bgcolor: '#f9fafb' } }}
          >
            <ListItemText primary="Products" primaryTypographyProps={{ fontWeight: 500, color: '#1f2937', textAlign: 'center' }} />
            {mobileProductsOpen ? <ExpandLess sx={{ color: '#4F46E5', ml: 1 }} /> : <KeyboardArrowDownIcon sx={{ ml: 1 }} />}
          </ListItemButton>
          
          <Collapse in={mobileProductsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2, borderLeft: '2px solid #f3f4f6', ml: 3, mt: 1, mb: 2 }}>
              
              {/* Software (Mobile) */}
              <ListItemButton onClick={() => setMobileSoftOpen(!mobileSoftOpen)} sx={{ py: 1, px: 2, borderRadius: 1 }}>
                <ListItemText primary="Software Products" primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: '#374151' }} />
                {mobileSoftOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </ListItemButton>
              <Collapse in={mobileSoftOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => navigateTo('/finexa')}>
                    <ListItemText primary="Finexa" primaryTypographyProps={{ fontSize: '13px', color: '#4B5563' }} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => navigateTo('/healnet')}>
                    <ListItemText primary="HealNet" primaryTypographyProps={{ fontSize: '13px', color: '#4B5563' }} />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* Hardware (Mobile) */}
              <ListItemButton onClick={() => setMobileHardOpen(!mobileHardOpen)} sx={{ py: 1, px: 2, borderRadius: 1 }}>
                <ListItemText primary="Hardware Products" primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: '#374151' }} />
                {mobileHardOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </ListItemButton>
              <Collapse in={mobileHardOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => navigateTo('/coming-soon')}>
                    <ListItemText primary="Hardware Product 1" primaryTypographyProps={{ fontSize: '13px', color: '#4B5563' }} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => navigateTo('/coming-soon')}>
                    <ListItemText primary="Hardware Product 2" primaryTypographyProps={{ fontSize: '13px', color: '#4B5563' }} />
                  </ListItemButton>
                </List>
              </Collapse>

            </List>
          </Collapse>
        </List>
      </div>

    </div>
  );
};

export default ProductsMenu;
