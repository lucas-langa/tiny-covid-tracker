
import { useState, useEffect } from 'react'
import getAllVaccines from '../data/vaccinedata'

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(candidate, details, institutions, mechanism, sponsors, trialPhase) {
    return {
        candidate,
        mechanism,
        trialPhase,
        more: [
            { info: details },
            { funding: sponsors }
        ],

    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.candidate}
                </TableCell>
                <TableCell align="right">{row.mechanism}</TableCell>
                {/* <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Institutions
              </Typography>
                            {/* <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.more.map((historyRow) => (
                                        <TableRow key={historyRow.details}>
                                            <TableCell align="right" component="th" scope="row">
                                                {historyRow.funding}
                                            </TableCell>
                                            { <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table> */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         candidate: PropTypes.string.isRequired,
//         details: PropTypes.string.isRequired,
//         mechanism: PropTypes.string.isRequired,
//         Institutions: PropTypes.arrayOf(
//             PropTypes.shape({
//                 institutions: PropTypes.array.isRequired,
//                 // customerId: PropTypes.string.isRequired,
//                 // date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         // name: PropTypes.string.isRequired,
//         // price: PropTypes.number.isRequired,
//         // protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];


function Home() {
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        let data = async () => {
            try {
                data = await getAllVaccines();

                setVaccines(data);
                data = data.map((value) => {
                    value.id = value.candidate;

                })
            } catch (err) {
                console.log(err)
            }
        };
        data()

    }, [setVaccines])
    console.log(vaccines)
    return (
        <div style={{ height: 700, width: '100%' }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vaccines.length > 0 && vaccines.map((vaccine) => (
                            <Row key={vaccine.name} row={vaccine} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export { Home };