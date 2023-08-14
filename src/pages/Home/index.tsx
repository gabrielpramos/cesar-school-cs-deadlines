import { Box, CircularProgress, Link, Typography } from '@mui/material';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useNavbar } from '@cincoders/cinnamon';
import FilterPage from '../../components/Filter';
import { FilterContainer, TextContainer } from './styles';
import { DeadlineProps } from '../../components/Conference';

function compare(a: DeadlineProps, b: DeadlineProps) {
  if (a.submissionDeadline < b.submissionDeadline) {
    if (a.submissionDeadline < new Date()) {
      return 1;
    }
    return -1;
  }
  if (a.submissionDeadline > b.submissionDeadline) {
    if (b.submissionDeadline < new Date()) {
      return -1;
    }
    return 1;
  }
  return 0;
}

function Home() {
  const [deadlines, setDeadlines] = useState<DeadlineProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navbar = useNavbar();

  useEffect(() => {
    const sheetUrl =
      'https://docs.google.com/spreadsheets/d/' +
      `${process.env.REACT_APP_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${process.env.REACT_APP_SHEET_NAME}`;
    Papa.parse(sheetUrl, {
      download: true,
      complete(results) {
        const rawDeadlines: string[][] = results.data as string[][];
        const parsedDeadlines = rawDeadlines.map((deadline: string[]) => ({
          greatArea: deadline[rawDeadlines[0].indexOf('GreatArea')],
          area: deadline[rawDeadlines[0].indexOf('Area')],
          deadlineId: deadline[rawDeadlines[0].indexOf('DeadlineId')],
          conference: deadline[rawDeadlines[0].indexOf('Conference')],
          website: deadline[rawDeadlines[0].indexOf('WebSite')],
          conferenceDetail: deadline[rawDeadlines[0].indexOf('ConferenceDetail')],
          conferenceDates: deadline[rawDeadlines[0].indexOf('ConferenceDates')],
          location: deadline[rawDeadlines[0].indexOf('Location')],
          submissionDeadline: new Date(deadline[rawDeadlines[0].indexOf('DeadlineISO')]),
          deadlineDetails: deadline[15],
        }));

        parsedDeadlines.splice(0, 1);
        parsedDeadlines.sort(compare);
        setDeadlines(parsedDeadlines);
        setLoading(false);
      },
    });
    navbar?.setTitle(window.innerWidth >= 900 ? 'Top CS Conference Deadlines' : 'Conference Deadlines');
  }, [navbar]);

  return (
    <>
      <TextContainer>
        <Typography variant='h6'>
          {'The top CS conferences are listed in '}
          <Link target='_blank' href='https://CSRankings.org'>
            CSRankings.org
          </Link>
        </Typography>
      </TextContainer>
      {loading && (
        <Box display='flex' justifyContent='center' alignItems='center' flexGrow='1' width='100%'>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <FilterContainer>
          <FilterPage deadlines={deadlines} />
        </FilterContainer>
      )}
    </>
  );
}

export default Home;
