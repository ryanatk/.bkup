import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  TypographyH2 as H2,
  TypographyH3 as H3,
  TypographyH3List as H3List,
} from '../../../components/pages/privacy-policy-oura-health/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  BodyLink,
  Box,
  Footer,
  Header,
  List,
  ListItem,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../../components/sormus';
import pageStyles from '../PrivacyPolicyOuraHealth.module.scss';

const PrivacyPolicyOuraHealth = () => {
  const accordionWrapper = useRef(null);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const handleAccordionClick = (e: any, index: number) => {
    setActiveAccordionIndex(index);
    e.preventDefault();
  };

  const handleAccordionChange = (index: number) => {
    setActiveAccordionIndex(index);

    if (window && accordionWrapper.current) {
      window.scrollTo({
        top: accordionWrapper.current.offsetTop - 105, // TODO: Use header ref from ECOMM-1270
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="tailwind">
      <div className="bg-white" lang="es">
        <Header bordered />
        <PageContainer name="privacy-policy-oura-health-es" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Declaración de privacidad de Oura
              </Typography>
              <H2>ACERCA DE ESTA DECLARACIÓN DE PRIVACIDAD</H2>
              <Typography>
                En Oura, nos tomamos muy en serio la protección de los datos
                personales del usuario. Esta Declaración de privacidad se aplica
                al tratamiento de datos personales por parte de Oura Health Oy y
                Ouraring Inc. («Oura» de forma colectiva).
              </Typography>
              <Typography>
                Nuestros productos, como el anillo Oura, le permiten hacer un
                seguimiento de su estilo de vida y de la calidad de su sueño.
                Entendemos que no hay datos mucho más personales que esto y la
                protección de sus datos personales es de suma importancia para
                nosotros. El usuario deberá dedicar unos minutos a revisar
                cuidadosamente esta declaración.
              </Typography>
              <H2>¿POR QUÉ TRATA OURA SUS DATOS PERSONALES?</H2>
              <Typography>
                Al abrir uno de los encabezados de sección que aparecen a
                continuación, explicaremos las categorías de datos personales
                que recopilamos y tratamos, así como las razones por las que lo
                hacemos, como por ejemplo para proporcionar al usuario servicios
                cuando visita nuestro sitio web, realiza compras en nuestro
                sitio o utiliza su anillo y su aplicación. También encontrará
                información sobre nuestra base legal para el tratamiento de sus
                datos y nuestras fuentes de datos.
              </Typography>
              <div
                className={pageStyles.AccordionWrapper}
                ref={accordionWrapper}
              >
                <Accordion
                  openAtIndex={activeAccordionIndex}
                  icon={<ArrowDownwardIcon className="text-helsinkiBlue" />}
                  onChange={handleAccordionChange}
                >
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Usuarios de dispositivos y aplicaciones
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Usuarios de dispositivos y aplicaciones
                      </Typography>
                      <H2>FINES DEL TRATAMIENTO</H2>
                      <Typography>
                        Oura recopila y trata los datos personales de los
                        Usuarios de dispositivos y aplicaciones («Usuarios»)
                        únicamente para los siguientes fines:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Para proporcionar servicios Oura</H3List>
                          <Typography>
                            Tratamos los datos personales para proporcionar
                            servicios Oura y funciones de la aplicación, como
                            por ejemplo, para ofrecer al Usuario información
                            diaria sobre su disposición, sueño y actividad.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Para prestar servicio a los clientes</H3List>
                          <Typography>
                            Tratamos los datos personales con el fin de
                            proporcionar un servicio al cliente y gestionar
                            nuestra comunicación con los clientes. Si el usuario
                            se pone en contacto con nuestro servicio de
                            asistencia con preguntas sobre los datos de su
                            aplicación, podemos utilizar la información
                            proporcionada para responder a sus preguntas y para
                            resolver cualquier problema que pueda tener.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para desarrollar nuestros productos y servicios
                          </H3List>
                          <Typography>
                            Tratamos los datos del usuario relativos al uso del
                            anillo Oura y la plataforma para mejorar nuestros
                            servicios y funciones, como en la aplicación Oura.
                            Siempre que sea posible, lo haremos utilizando
                            únicamente datos seudonimizados, agregados o no
                            identificables personalmente.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para comercializar nuestros productos y servicios
                          </H3List>
                          <Typography>
                            Tratamos los datos relacionados con la mercadotecnia
                            para proporcionar publicidad en línea y
                            comunicaciones de mercadotecnia de Oura. Por
                            ejemplo, como se explica con más detalle en nuestra{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                Política de cookies
                              </BodyLink>
                            </Link>
                            , utilizamos cookies en nuestro sitio web con el fin
                            de crear audiencias específicas para la publicidad
                            en línea. El usuario siempre puede optar por no
                            recibir comunicaciones de mercadotecnia y solo le
                            enviaremos nuestro boletín si lo ha solicitado.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para permitir la integración de terceros
                          </H3List>
                          <Typography>
                            Tratamos los datos de los Usuarios que lo soliciten
                            para compartirlos con determinados terceros, como
                            socios de investigación. Esto solo se hace con su
                            consentimiento expreso.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para cumplir con las obligaciones legales
                          </H3List>
                          <Typography>
                            En algunos casos, debemos tratar determinados datos
                            cuando así lo exigen las leyes y normativas
                            aplicables. Estas obligaciones legales están
                            relacionadas, por ejemplo, con requisitos contables
                            y fiscales, reclamaciones judiciales u otros fines
                            legales.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>BASE LEGAL PARA EL TRATAMIENTO</H2>
                      <Typography>
                        La ley de protección de datos en Europa exige una «base
                        legal» para recopilar y retener información personal de
                        residentes en el Espacio Económico Europeo. Nuestras
                        bases legales para el tratamiento de sus datos dependen
                        de los fines particulares del tratamiento, entre ellos:
                      </Typography>
                      <Typography>
                        <strong>Contrato:</strong> cuando tratamos los datos
                        personales con el fin de prestar servicios Oura, lo
                        hacemos sobre la base de un contrato de usuario, que se
                        establece cuando el usuario crea su cuenta y acepta
                        nuestros términos y condiciones.
                      </Typography>
                      <Typography>
                        <strong>Consentimiento:</strong> tratamos los datos del
                        usuario relacionados con la salud solo con su
                        consentimiento. En algunos casos, puede darnos su
                        consentimiento para el tratamiento de sus datos a través
                        de sus acciones, como por ejemplo, insertando datos de
                        salud en sus notas o añadiendo etiquetas relacionadas
                        con la salud en la aplicación Oura.
                      </Typography>
                      <Typography>
                        <strong>Interés legítimo:</strong> tratamos los datos
                        personales del usuario basándonos en nuestros intereses
                        legítimos cuando los tratamos con el fin de
                        comercializar nuestros productos y servicios, prestar
                        nuestro servicio de atención al cliente y mejorar
                        nuestros productos y servicios. Cuando decidimos
                        utilizar los datos del usuario sobre la base de nuestros
                        intereses legítimos, sopesamos cuidadosamente nuestros
                        propios intereses frente a su derecho a la privacidad,
                        en cumplimiento de la legislación aplicable.
                      </Typography>
                      <Typography>
                        <strong>Obligación legal:</strong> Oura debe tratar
                        cierta información para cumplir con las obligaciones
                        legales que pueden variar en cada país. Por ejemplo,
                        estas obligaciones pueden estar relacionadas con la
                        protección del consumidor o la legislación fiscal.
                      </Typography>
                      <H2>DATOS TRATADOS Y FUENTE DE DATOS</H2>
                      <Typography>
                        En la mayoría de los casos, Oura recopila datos
                        personales directamente del usuario, como cuando se
                        registra en una cuenta o utiliza su anillo para recoger
                        datos de medición a través de las funciones de
                        seguimiento del anillo Oura. También podemos tratar los
                        datos que se generan a partir de la información que el
                        usuario nos proporciona.
                      </Typography>
                      <Typography>
                        Oura trata las siguientes categorías de datos personales
                        sobre los Usuarios de dispositivos y aplicaciones:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Información de contacto</strong>, como la
                          dirección de correo electrónico o la dirección física.
                        </ListItem>
                        <ListItem>
                          <strong>Información del usuario</strong>, como el
                          género, la altura y el peso, la identificación del
                          usuario y otra información que pueda proporcionarnos
                          sobre sí mismo o su cuenta.
                        </ListItem>
                        <ListItem>
                          <strong>Información del dispositivo</strong>, como la
                          dirección IP y los datos de localización.
                        </ListItem>
                        <ListItem>
                          <strong>
                            Información sobre la actividad y el contexto del
                            usuario
                          </strong>{' '}
                          como actividades, notas y etiquetas.
                        </ListItem>
                        <ListItem>
                          <strong>Datos de medición</strong>, como la frecuencia
                          cardíaca, datos de movimiento y datos de temperatura.
                        </ListItem>
                        <ListItem>
                          <strong>
                            Datos calculados del usuario, el sueño y la
                            actividad
                          </strong>
                          , como las fases del sueño (profundo, ligero, REM,
                          despierto), los niveles de actividad a lo largo del
                          día, el nivel de disposición y el índice de masa
                          corporal (calculado a partir de la altura y el peso).
                        </ListItem>
                      </List>
                      <Typography>
                        Es importante tener en cuenta que algunos de los datos
                        personales que tratamos, incluidos los relativos a su
                        salud, se consideran datos personales especiales o
                        sensibles. De acuerdo con la legislación vigente, estos
                        datos solo se tratan si el usuario ha dado su
                        consentimiento para el tratamiento. Si el usuario accede
                        a o utiliza cualquiera de los servicios Oura basados en
                        la localización, como por ejemplo, habilitando el
                        seguimiento de la actividad basado en el GPS a través de
                        su aplicación, Oura puede tratar la localización
                        aproximada o precisa de su dispositivo mientras el
                        servicio está activo. Estos datos pueden obtenerse a
                        través del identificador de red del proveedor de
                        servicios de su dispositivo, del GPS o de los datos de
                        la conexión WiFi. Oura no trata estos datos de
                        localización sin obtener previamente el consentimiento
                        del usuario. El usuario puede desactivar dicho
                        tratamiento de la localización en cualquier momento
                        mediante la configuración de los permisos de
                        localización de su dispositivo.
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Clientes de la tienda en línea y visitantes del sitio web
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Clientes de la tienda en línea y visitantes del sitio
                        web
                      </Typography>
                      <H2>FINES DEL TRATAMIENTO</H2>
                      <Typography>
                        Si el usuario visita el sitio web de Oura o realiza un
                        pedido en la tienda en línea de Oura, tratamos los datos
                        personales para los siguientes fines:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Para completar y entregar sus pedidos</H3List>
                          <Typography>
                            Tratamos los datos personales para procesar,
                            gestionar y entregar sus compras, y para facilitar
                            su compra.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Para prestar servicio a los clientes</H3List>
                          <Typography>
                            Tratamos los datos personales con el fin de
                            proporcionar un servicio al cliente y gestionar la
                            comunicación con nuestros clientes. Si se pone en
                            contacto con nuestro servicio de asistencia con
                            preguntas relacionadas con el anillo Oura o nuestros
                            servicios, utilizaremos la información proporcionada
                            para responder a sus preguntas y ayudarle a resolver
                            cualquier problema que pueda tener.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para desarrollar y mejorar nuestros servicios
                          </H3List>
                          <Typography>
                            Tratamos la información relativa al uso de nuestro
                            sitio por parte de los visitantes para mejorar la
                            calidad de nuestros servicios en línea. Esto puede
                            implicar el uso de estadísticas web y tendencias en
                            nuestro sitio web y en nuestra tienda en línea.
                            Siempre que sea posible, lo haremos utilizando
                            únicamente datos agregados y anonimizados.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para publicitar y comercializar nuestros servicios
                          </H3List>
                          <Typography>
                            Tratamos los datos de mercadotecnia para
                            proporcionar publicidad en línea y comunicaciones de
                            mercadotecnia de Oura. Oura no se dirige a las
                            personas con publicidad en línea basada en sus datos
                            de salud en la aplicación Oura. Como se explica con
                            más detalle en nuestra{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                Política de cookies
                              </BodyLink>
                            </Link>
                            , utilizamos cookies en nuestro sitio web con el fin
                            de crear audiencias específicas para la publicidad
                            en línea. El usuario siempre puede optar por no
                            recibir comunicaciones de mercadotecnia y solo le
                            enviaremos nuestro boletín si lo ha solicitado.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Para cumplir con las obligaciones legales
                          </H3List>
                          <Typography>
                            En algunos casos, debemos tratar determinados datos
                            cuando así lo exige la legislación aplicable. Estas
                            obligaciones legales están relacionadas, por
                            ejemplo, con requisitos contables y fiscales,
                            reclamaciones judiciales u otros fines legales.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>BASE LEGAL PARA EL TRATAMIENTO</H2>
                      <Typography>
                        La ley de protección de datos en Europa exige una «base
                        legal» para recopilar y retener información personal de
                        residentes en el Espacio Económico Europeo. Nuestras
                        bases legales para el tratamiento de sus datos dependen
                        de los fines particulares del tratamiento, entre ellos:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Contrato:</strong> cuando tratamos los datos
                          personales para gestionar y entregar las compras del
                          usuario, nos basamos en la base legal de un contrato
                          de usuario, que se crea al realizar el pedido.
                        </ListItem>
                        <ListItem>
                          <strong>Consentimiento:</strong> tratamos los datos
                          personales del usuario con fines de mercadotecnia
                          electrónica directa si el usuario ha dado su
                          consentimiento para ello.
                        </ListItem>
                        <ListItem>
                          <strong>Interés legítimo:</strong> cuando tratamos los
                          datos personales del usuario con fines de servicio al
                          cliente, mercadotecnia y desarrollo de nuestros
                          productos, lo hacemos sobre la base de nuestro interés
                          legítimo para dirigir, mantener y desarrollar nuestro
                          negocio, y para crear y mantener relaciones con los
                          clientes. Cuando decidimos utilizar sus datos sobre la
                          base de nuestros intereses legítimos, sopesamos
                          cuidadosamente nuestros propios intereses frente a su
                          derecho a la privacidad, en virtud de la legislación
                          aplicable.
                        </ListItem>
                        <ListItem>
                          <strong>Obligación legal:</strong> Oura debe tratar
                          cierta información para cumplir con las obligaciones
                          legales que pueden variar en cada país. Por ejemplo,
                          estas obligaciones pueden estar relacionadas con la
                          protección del consumidor o la legislación contable.
                        </ListItem>
                      </List>
                      <H2>DATOS TRATADOS Y FUENTE DE DATOS</H2>
                      <Typography>
                        En la mayoría de los casos, recopilamos datos personales
                        directamente del usuario si decide completar pedidos en
                        nuestra tienda en línea o si se pone en contacto con
                        nosotros con una pregunta o reclamación. Cuando el
                        usuario visita el sitio web o la tienda en línea de
                        Oura, recopilamos datos analíticos sobre él a través de
                        su dispositivo y navegador mediante cookies y otras
                        tecnologías diversas con fines de desarrollo de
                        servicios y publicidad.
                      </Typography>
                      <Typography>
                        Tratamos las siguientes categorías de datos personales
                        sobre los visitantes del sitio web y de la tienda en
                        línea:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Información de contacto</strong>, como nombre,
                          dirección de correo electrónico y dirección postal.
                        </ListItem>
                        <ListItem>
                          <strong>Información sobre la entrega</strong>, como
                          sus compras y el método de pago elegido.
                        </ListItem>
                        <ListItem>
                          <strong>Información del dispositivo</strong>, como la
                          dirección IP, la hora de la visita y los datos de
                          localización.
                        </ListItem>
                        <ListItem>
                          <strong>La actividad del usuario</strong>, como los
                          patrones de navegación en el sitio y cualquier
                          comunicación que tenga con nosotros.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Residentes de California
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        Residentes de California
                      </Typography>
                      <H2>AVISO DE LA CCPA PARA CONSUMIDORES DE CALIFORNIA</H2>
                      <Typography>
                        Este aviso complementa la información contenida en esta
                        Declaración de privacidad de Oura y sus filiales
                        (colectivamente, «nosotros», «nos» o «nuestro») y se
                        aplica únicamente a todos los visitantes, usuarios y
                        otras personas que residan en el Estado de California
                        («clientes» o «usuario»), y que accedan al sitio web de
                        Oura o a los servicios prestados por Oura. Adoptamos
                        este aviso para cumplir con la Ley de Privacidad del
                        Consumidor de California de 2018 («CCPA») y cualquier
                        término definido en la CCPA tiene el mismo significado
                        cuando se utiliza en este aviso.
                      </Typography>
                      <H2>RECOPILACIÓN, USO E INTERCAMBIO DE INFORMACIÓN</H2>
                      <Typography>
                        Cuando un cliente interactúa con los productos y/o
                        servicios Oura, Oura recopila información que
                        identifica, se relaciona, describe, hace referencia, es
                        razonablemente capaz de asociarse con, o podría
                        razonablemente vincularse, directa o indirectamente, con
                        un consumidor o dispositivo particular («Información
                        personal»).
                      </Typography>
                      <Typography>
                        La información sobre las categorías de información
                        personal que recopilamos, los fines para los que se
                        trata la información personal del usuario y cualquier
                        intercambio de dicha información, se puede encontrar en
                        las secciones pertinentes de esta Declaración de
                        privacidad mencionadas anteriormente:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            Usuario de dispositivos y aplicaciones: categorías
                            de información personal recopilada y fines del
                            tratamiento
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            Visitante de la tienda en línea y del sitio web:
                            categorías de información personal recopilada y
                            fines del tratamiento
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            Intercambio de datos personales
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        En los últimos doce (12) meses, no hemos vendido
                        Información personal a terceros, incluidos los
                        agregadores de datos.
                      </Typography>
                      <H2>DERECHOS DEL CONSUMIDOR EN CALIFORNIA</H2>
                      <Typography>
                        Si el usuario reside en California, tiene ciertos
                        derechos en virtud de la CCPA:
                      </Typography>
                      <H3>
                        Derecho a conocer la información personal que
                        recopilamos y compartimos
                      </H3>
                      <Typography>
                        La CCPA le da derecho a solicitar que revelemos la
                        información personal que hemos recopilado sobre el
                        usuario en los últimos 12 meses, lo que haremos después
                        de recibir y validar su solicitud. Una vez que recibamos
                        y confirmemos su solicitud verificable como consumidor,
                        le comunicaremos lo siguiente:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          las categorías de información personal que recopilamos
                          sobre el usuario;
                        </ListItem>
                        <ListItem>
                          las categorías de información personal que hemos
                          revelado sobre el usuario (si las hay);
                        </ListItem>
                        <ListItem>
                          las categorías de fuentes de la información personal
                          que recopilamos sobre el usuario;
                        </ListItem>
                        <ListItem>
                          nuestros fines empresariales o comerciales para
                          recopilar o vender esa información personal;
                        </ListItem>
                        <ListItem>
                          las categorías de terceros con los que compartimos esa
                          información personal; y
                        </ListItem>
                        <ListItem>
                          los datos personales específicos que recopilamos sobre
                          el usuario. Es importante tener en cuenta que la CCPA
                          nos prohíbe
                        </ListItem>
                      </List>
                      <H3>Derecho de eliminación</H3>
                      <Typography>
                        El usuario tiene derecho a solicitar la eliminación de
                        su información personal, con ciertas excepciones, como
                        cuando tenemos la obligación legal de conservar los
                        datos en cuestión. Tras recibir y validar su solicitud,
                        eliminaremos su información personal e indicaremos a
                        nuestros proveedores de servicios que también eliminen
                        dicha información personal, a menos que se aplique una
                        excepción.
                      </Typography>
                      <H3>
                        Cómo realizar solicitudes de divulgación, acceso o
                        eliminación de datos
                      </H3>
                      <Typography>
                        Si el usuario reside en California, puede solicitar la
                        divulgación, el acceso y/o la eliminación de sus datos
                        personales, tal y como se ha descrito anteriormente,
                        presentándonos una solicitud verificable del consumidor
                        por cualquiera de los siguientes medios:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          enviando un correo electrónico a{' '}
                          <strong>dataprotection@ouraring.com</strong>,
                          incluyendo la siguiente información junto con su
                          solicitud: su nombre completo, nombre de la empresa
                          (si procede), dirección, dirección de correo
                          electrónico y un número de teléfono. Podremos pedirle
                          que proporcione información adicional si es necesario
                          para confirmar su identidad. Esto es por motivos de
                          seguridad y, en algunos casos, es obligatorio por ley.
                        </ListItem>
                      </List>
                      <Typography>
                        El usuario, o una persona registrada en la Secretaría de
                        Estado de California a la que el usuario autorice a
                        actuar en su nombre, es la única persona que puede hacer
                        una solicitud verificable de consumidor relacionada con
                        su información personal. También puede presentar una
                        solicitud de consumidor verificable en nombre de su hijo
                        menor de edad.
                      </Typography>
                      <Typography>
                        El usuario tiene derecho a realizar una solicitud
                        gratuita hasta dos veces en un período de 12 meses.
                        Responderemos a todas las solicitudes validadas en un
                        plazo de 45 días a partir de la recepción de las mismas,
                        a menos que solicitemos una prórroga. En caso de que
                        necesitemos razonablemente una prórroga para responder a
                        su solicitud, le notificaremos dicha prórroga dentro del
                        plazo inicial de 45 días.
                      </Typography>
                      <H3>No discriminación</H3>
                      <Typography>
                        Oura no discrimina a los usuarios que solicitan el
                        ejercicio de sus derechos de privacidad en virtud de la
                        CCPA. Salvo que se aplique una excepción, esto incluye
                        nuestra promesa de:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          no negar al usuario bienes o servicios;
                        </ListItem>
                        <ListItem>
                          no cobrarle precios o tarifas diferentes por los
                          bienes o servicios, incluida la concesión de
                          descuentos u otros beneficios, o la imposición de
                          penalizaciones;
                        </ListItem>
                        <ListItem>
                          no proporcionarle un nivel o calidad diferentes de
                          bienes o servicios; o
                        </ListItem>
                        <ListItem>
                          no sugerir que puede recibir un precio o tarifa
                          diferentes por los bienes o servicios, o un nivel o
                          calidad diferentes de los mismos.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  INTERCAMBIO Y DIVULGACIÓN DE DATOS
                </Typography>
                <H2>Intercambio de datos personales</H2>
                <Typography>
                  Oura no vende ni alquila los datos personales del usuario, y
                  solo los comparte con determinados proveedores de servicios de
                  confianza para poder ofrecerle nuestros servicios y hacer
                  funcionar nuestra empresa. Siempre que compartimos datos con
                  terceros proveedores de servicios, les exigimos que utilicen
                  su información solo para los fines que hemos autorizado, y por
                  las razones limitadas que se explican en esta Declaración de
                  privacidad. También exigimos a estos proveedores de servicios
                  que protejan la información personal del usuario al menos con
                  los mismos estándares que nosotros.
                </Typography>
                <Typography>
                  Como la mayoría de las empresas, Oura recurre a proveedores de
                  servicios para fines como:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    proporcionar y mejorar nuestra plataforma de servicios en
                    línea;
                  </ListItem>
                  <ListItem>almacenar los datos de nuestros usuarios;</ListItem>
                  <ListItem>prestar servicios a los clientes; </ListItem>
                  <ListItem>
                    gestionar y organizar nuestras actividades de mercadotecnia.
                    Oura solo comparte los datos de uso del sitio web con
                    nuestros socios de la red de publicidad con el fin de
                    analizar y optimizar nuestra mercadotecnia. Oura no comparte
                    los datos de la aplicación Oura con anunciantes externos; y
                  </ListItem>
                  <ListItem>
                    analizar la información relativa al uso de nuestro servicio
                    en línea para mejorar la calidad de nuestro servicio.
                  </ListItem>
                </List>
                <Typography>
                  Oura almacena los datos personales principalmente en la región
                  geográfica donde se recopilan. En los casos en los que los
                  datos personales se traten fuera de la zona en la que se
                  recopilaron, siempre nos aseguramos de que los datos
                  personales del usuario estén protegidos con las medidas de
                  seguridad adecuadas de acuerdo con la legislación sobre
                  privacidad aplicable. También utilizamos medidas de protección
                  de datos estándar del sector para salvaguardar todas las
                  transferencias internacionales de datos personales mediante
                  acuerdos de protección de datos con nuestros proveedores de
                  servicios.
                </Typography>
                <H2>Divulgación de datos personales</H2>
                <Typography>
                  Asimismo, nos reservamos el derecho a revelar información
                  personal en determinadas circunstancias específicas, como por
                  ejemplo:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    cuando tengamos el consentimiento expreso del usuario para
                    hacerlo;
                  </ListItem>
                  <ListItem>
                    cuando sea razonablemente necesario para nuestros intereses
                    legítimos en la conducción de nuestro negocio, como en el
                    caso de una fusión, adquisición o venta;
                  </ListItem>
                  <ListItem>
                    para proteger los derechos legales y la propiedad de Oura; y
                  </ListItem>
                  <ListItem>
                    para cumplir con la ley o la aplicación de la ley.
                  </ListItem>
                </List>
                <Typography>
                  Por lo demás, la información personal del usuario nunca se
                  comparte con ningún individuo u otra organización.
                </Typography>
                <H2>PROTECCIÓN DE LOS DATOS</H2>
                <Typography>
                  Oura utiliza medidas de seguridad técnicas y organizativas
                  para mantener los datos del usuario a salvo. En su caso, estas
                  medidas de seguridad incluyen la anonimización o
                  seudonimización de los datos personales, un estricto control
                  de acceso y el uso de cifrado para proteger los datos que
                  tratamos.
                </Typography>
                <Typography>
                  También nos aseguramos de que nuestro personal reciba la
                  formación adecuada para garantizar que los datos personales se
                  traten únicamente de acuerdo con nuestras políticas internas,
                  en consonancia con nuestras obligaciones en virtud de la
                  legislación aplicable. Además, limitamos el acceso a los datos
                  personales sensibles del usuario al personal al que se le ha
                  concedido específicamente dicho acceso.
                </Typography>
                <Typography>
                  Los servicios en línea que proporcionamos, como la tienda en
                  línea Oura y Oura en la web, protegen los datos personales del
                  usuario en tránsito utilizando encriptación y otras medidas de
                  seguridad. También probamos regularmente nuestros servicios,
                  sistemas y otros activos para detectar posibles
                  vulnerabilidades de seguridad.
                </Typography>
                <Typography>
                  Actualizamos la aplicación Oura y el firmware del anillo
                  regularmente. Recomendamos al usuario que se asegure de tener
                  siempre instaladas las últimas versiones de la aplicación y
                  del firmware para maximizar la protección de sus datos.
                </Typography>
                <H2>CONSERVACIÓN DE LOS DATOS</H2>
                <Typography>
                  El período de conservación de los datos personales del usuario
                  depende generalmente de la duración del ciclo de vida de su
                  cuenta Oura. Sus datos personales se eliminarán cuando ya no
                  sean necesarios para el fin para el que se recopilaron
                  originalmente, a menos que tengamos la obligación legal de
                  conservarlos durante más tiempo. Por ejemplo, los datos de
                  medición relativos a su sueño, disposición y actividad se
                  almacenan solo mientras esté activa su cuenta Oura.
                </Typography>
                <Typography>
                  Oura también tiene la obligación legal de conservar
                  determinados datos personales durante un período de tiempo
                  específico, como por ejemplo, a efectos fiscales. Estos
                  períodos de conservación requeridos pueden incluir, por
                  ejemplo, requisitos contables y fiscales, reclamaciones
                  legales o cualquier otro fin legal. Debe tenerse en cuenta que
                  los períodos obligatorios de conservación de los datos
                  personales varían en función de la legislación pertinente.
                </Typography>
                <Typography>
                  Si lo desea, el usuario puede solicitar la eliminación de su
                  cuenta Oura dirigiéndose a{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H2>USO DE COOKIES</H2>
                <Typography>
                  Utilizamos cookies y otras tecnologías diversas para recopilar
                  y almacenar información analítica y de otro tipo cuando los
                  clientes utilizan nuestro sitio, así como para fines de
                  personalización y publicidad. Las cookies que utilizamos
                  incluyen tanto cookies de origen como de terceros.
                </Typography>
                <Typography>
                  Las cookies son pequeños archivos de texto que se envían y se
                  guardan en el dispositivo del usuario, y que nos permiten
                  identificar a los visitantes de nuestros sitios web y
                  facilitar el uso de nuestro sitio, así como crear información
                  global de nuestros visitantes. Esto nos ayuda a mejorar
                  nuestro servicio y a atender mejor a nuestros clientes, y no
                  dañará el dispositivo ni los archivos del usuario. Utilizamos
                  cookies para adaptar nuestro sitio y la información que
                  proporcionamos de acuerdo con los intereses individuales de
                  nuestros clientes. Las cookies también se utilizan para
                  rastrear hábitos de navegación y para orientar y optimizar la
                  publicidad, tanto en nuestro sitio como en otros sitios que el
                  usuario pueda visitar. Asimismo, utilizamos cookies para
                  integrar nuestras cuentas de redes sociales en nuestro sitio
                  web.
                </Typography>
                <H2>DERECHOS DEL USUARIO COMO INTERESADO</H2>
                <Typography>
                  Siempre que Oura trata los datos del usuario, este tiene
                  ciertos derechos que le permiten controlar el tratamiento de
                  sus datos personales. Esta sección se proporciona información
                  sobre cada uno de esos derechos. Para ejercer sus derechos
                  como interesado, el usuario debe dirigirse a{' '}
                  <strong>dataprotection@ouraring.com</strong> con la solicitud
                  correspondiente.
                </Typography>
                <H3>Derecho de acceso a los datos</H3>
                <Typography>
                  El usuario tiene derecho a saber qué datos personales se
                  tratan sobre él. Puede ponerse en contacto con nosotros para
                  solicitar acceso a los datos personales que hemos recopilado
                  sobre él. Le confirmaremos si estamos tratando sus datos y le
                  proporcionaremos información sobre los datos personales que
                  hemos recopilado y tratado.
                </Typography>
                <Typography>
                  Debe tenerse en cuenta que, al utilizar la aplicación, Oura
                  puede acceder fácilmente a los datos de sueño, disposición y
                  actividad del usuario. También puede acceder a los datos del
                  usuario a través de Oura on the Web, en{' '}
                  <a
                    href="https://cloud.ouraring.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    https://cloud.ouraring.com
                  </a>
                  .
                </Typography>
                <H3>Derecho de supresión</H3>
                <Typography>
                  El usuario tiene derecho a solicitar la supresión de sus datos
                  personales en determinadas circunstancias. Cumpliremos con
                  dichas solicitudes a menos que tengamos una base legal válida
                  o una obligación legal de conservar los datos.
                </Typography>
                <H3>Derecho de rectificación (de datos inexactos)</H3>
                <Typography>
                  El usuario tiene derecho a solicitar la corrección de
                  cualquier dato personal incorrecto o incompleto que hayamos
                  almacenado sobre él.
                </Typography>
                <Typography>
                  El usuario puede corregir y actualizar algunos de sus datos
                  básicos mediante la aplicación Oura y a través de Oura on the
                  Web.
                </Typography>
                <H3>Derecho a la portabilidad de los datos</H3>
                <Typography>
                  El usuario tiene derecho a solicitar la recepción de los datos
                  personales que nos ha proporcionado en un formato estructurado
                  y de uso común. El derecho a la portabilidad de los datos solo
                  se aplica cuando tratamos sus datos personales por
                  determinados motivos, como por ejemplo, por contrato o por su
                  consentimiento.
                </Typography>
                <Typography>
                  Oura en la web ofrece al usuario la posibilidad de exportar
                  sus propios datos.
                </Typography>
                <H3>Derecho a oponerse al tratamiento</H3>
                <Typography>
                  El usuario tiene derecho a oponerse al tratamiento de sus
                  datos personales en determinadas circunstancias. En el caso de
                  que no tengamos motivos legítimos para seguir tratando dichos
                  datos personales, dejaremos de tratar sus datos personales una
                  vez que hayamos recibido y verificado su objeción. También
                  tiene derecho a oponerse al tratamiento de sus datos
                  personales para fines de mercadotecnia directa en cualquier
                  momento.
                </Typography>
                <H3>Derecho a limitar el tratamiento</H3>
                <Typography>
                  El usuario tiene derecho a solicitar que limitemos el
                  tratamiento de sus datos personales en determinadas
                  circunstancias. Por ejemplo, si el usuario cuestiona la
                  exactitud de sus datos, puede presentar una solicitud de
                  limitación para que no tratemos sus datos hasta que Oura haya
                  verificado la exactitud de los mismos.
                </Typography>
                <H3>Derecho a retirar el consentimiento</H3>
                <Typography>
                  Si hemos solicitado su consentimiento para el tratamiento de
                  sus datos personales, el usuario tiene derecho a retirar su
                  consentimiento para dicho tratamiento en cualquier momento. No
                  obstante, debe tener en cuenta que la retirada de su
                  consentimiento puede dar lugar a problemas o restricciones en
                  su capacidad para utilizar plenamente los servicios Oura.
                </Typography>
                <Typography>
                  El usuario siempre puede darse de baja de la recepción de
                  nuestro boletín de noticias y de otros correos electrónicos de
                  mercadotecnia utilizando el enlace «Darse de baja»
                  (Unsubscribe) que aparece en los correos electrónicos que le
                  enviamos.
                </Typography>
                <Typography>
                  Oura se esfuerza por responder a sus preocupaciones en materia
                  de privacidad. Si se ha puesto en contacto con Oura acerca de
                  su preocupación y sigue sin estar satisfecho con nuestra
                  respuesta, con sujeción a la legislación aplicable, el usuario
                  puede ponerse en contacto con su autoridad local de control en
                  relación con su problema. Sin embargo, le recomendamos que
                  primero se ponga en contacto con nosotros a través de{' '}
                  <strong>dataprotection@ouraring.com</strong> para que podamos
                  resolver más rápidamente su problema antes de pasarlo al
                  siguiente nivel.
                </Typography>
                <Typography>
                  Si el usuario reside en el estado de California, deberá leer
                  el Aviso de privacidad de la CCPA de Oura para conocer más
                  sobre sus derechos según la legislación de California.
                </Typography>
                <H2>INFORMACIÓN DE CONTACTO DEL RESPONSABLE DEL TRATAMIENTO</H2>
                <Typography>
                  Ouraring Inc. es el responsable del tratamiento de los datos
                  personales de los usuarios con fines de mercadotecnia. El
                  responsable del tratamiento de los datos personales para todos
                  los demás fines del tratamiento es Oura Health Oy. A
                  continuación se indican nuestros datos de contacto:
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  Dirección: Elektroniikkatie 10, 90590 Oulu Finland
                </Typography>
                <Typography>
                  Delegado de protección de datos:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  Dirección: 60 Francisco St, San Francisco, CA, 94133-2104
                  United States
                </Typography>
                <Typography>
                  Delegado de protección de datos:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>CAMBIOS EN ESTA DECLARACIÓN DE PRIVACIDAD</H2>
              <Typography>
                Esta Declaración de privacidad es efectiva a partir del{' '}
                <strong>15 de septiembre de 2021</strong>. Nos reservamos el
                derecho de actualizar esta política cada cierto tiempo a nuestra
                entera discreción; en caso de hacerlo, informaremos al usuario
                de cualquier cambio importante notificándolo en el sitio web o
                enviándole un correo electrónico o una notificación push. Si
                sigue utilizando los servicios Oura después de un cambio, su uso
                continuado significará que el usuario acepta dichos cambios.
              </Typography>
            </TypographyRhythm>
          </Box>
        </PageContainer>
        <Footer />
      </div>
    </div>
  );
};

PrivacyPolicyOuraHealth.pageName = 'Oura Health Privacy Policy';
PrivacyPolicyOuraHealth.isSormusCompatible = true;

export default PrivacyPolicyOuraHealth;
