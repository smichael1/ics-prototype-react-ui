import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';
import LoadConfigButton from './load_config_button';
import ConfigList from './config_list';
import TreeExample from './tree_example';


class App extends Component {



  render() {
      

      return (

              <div className="row nopadding">
                  <div className="col-md-3 nopadding">

                      <TreeExample />
                  </div>
                  <div className="col-md-9">


                      <h1>Pupil Stage Assembly</h1>
                      <div className="panel panel-default">

                          <div id="commandSection" className="panel-body">
                              <div className="pull-right">
                                  <LoadButton />
                              </div>
                              <h2>Commands</h2>
                              <CommandList />
                          </div>
                      </div>
                      <div className="panel panel-default">
                          <div id="telemetrySection" className="panel-body">
                              <div className="pull-right">
                                  Mode: <button type="button" className="btn btn-success">Normal</button>
                              </div>
                              <h2>Telemetry</h2>
                              <TelemetryList />
                          </div>

                      </div>


                      <div className="panel panel-default">

                          <div id="configSection" className="panel-body">

                              <h2>Configuration</h2>
                              <div className="pull-right">
                                  <LoadConfigButton configFile="singleAxis" />
                              </div>

                              <h3>Assembly Config</h3>
                              <ConfigList target="singleAxis"/>
                              <div className="pull-right">
                                  <LoadConfigButton configFile="galilHCD" />
                              </div>
                              <h3>GalilHCD Config</h3>
                              <ConfigList target="galilHCD"/>



                          </div>
                      </div>




                  </div>

              </div>




      );
  }
}

export default App;