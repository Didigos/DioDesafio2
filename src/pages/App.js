import { useState } from 'react';
import gitlogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import api from '../components/services';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSeachRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {

      const isExist = repos.find(repos => repos.id === data.id)

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('repositório não existe/Já listado!')

  }
  const handleRemoveRepo = (id) => {
    const removedRepo = repos.filter(repo => repo.id !== id)
    setRepos(removedRepo)
  }

  return (
    < Container>
      <img src={gitlogo} width={72} height={72} alt='logo do github' />
      <Input value={currentRepo} onChange={(event) => setCurrentRepo(event.target.value)} />
      <Button onClick={handleSeachRepo} />
      {repos.map(repos => <ItemRepo key={repos.id} handleRemoveRepo={handleRemoveRepo} repo={repos} />)}

    </Container>
  );
}

export default App;
