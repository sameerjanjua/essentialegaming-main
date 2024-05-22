import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import numeral from 'numeral';




// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {

    function fShortenNumber(number) {
        const format = number ? numeral(number).format('0.00a') : '';
      
        return format;
      }

  return (
    <Card
      component={Stack}
      spacing={4}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}

    >
      {icon && <Box sx={{ width: 10, height: 10 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4">
            {fShortenNumber(total) || "0.00"}
            {/* total */}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};