import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity} from 'react-native'

import api from '../../services/api'

import styles from './styles'

import logo from '../../assets/logo.png'

export default function Incidents(){
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  
  async function loadIncidents(){
    if(loading){
      return;
    }

    if(total > 0 && incidents.length == total){
      return;
    }
  
    setLoading(true);

    const res = await api.get('/incidents', {
      params: {page}
    });

    setIncidents([... incidents, ... res.data]);
    setTotal(res.headers['x-total-count']);
    setPage(page+1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident })
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
      
      <FlatList
        data={incidents}
        style={styles.incidentsList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={incident => String(incident.id)}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG: </Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty}>CASO: </Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR: </Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}