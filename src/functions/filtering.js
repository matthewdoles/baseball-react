export const alphabeticalFilter = (teams) => {
  return teams.sort((a, b) => a.name.localeCompare(b.name));
};

export const establishedFilter = (teams) => {
  return teams.sort((a, b) => a.established - b.established);
};

export const nameSearchFilter = (teams, value) => {
  return teams.filter(
    (team) => team.name.toUpperCase().search(value.toUpperCase()) > -1,
  );
};

export const sortLeagueIntoDivisions = (allTeams, league) => {
  const selectedLeagueTeams = allTeams.filter((team) => team.league === league);
  const selectedLeagueConferences = [
    ...new Set(selectedLeagueTeams.map((team) => team.conference)),
  ].sort();
  const selectedLeagueDivisions = [
    ...new Set(selectedLeagueTeams.map((team) => team.division)),
  ].sort();

  const sortedTeams = [];
  selectedLeagueConferences.forEach((conference) => {
    const divisions = [];
    selectedLeagueDivisions.forEach((division) => {
      const divisionTeams = selectedLeagueTeams.filter(
        (team) => team.conference === conference && team.division === division,
      );
      if (divisionTeams.length > 0) {
        divisions.push({ name: division, teams: divisionTeams });
      }
    });
    sortedTeams.push({ name: conference, divisions });
  });
  return sortedTeams;
};
