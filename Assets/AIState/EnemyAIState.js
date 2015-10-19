#pragma strict

public class EnemyAIState {

  public var entity : GenericEnemy;
  private var time : float = 0;
  
  function EnemyAIState(entity: GenericEnemy) {
    this.entity = entity;
  }
  
  function OnStateEnter() {
  }

  function OnStateLeave() {
  }
  
  function Update() {
  }
  
  function TimerExpired(timeout : float) : boolean {
  	time += Time.deltaTime;
  	if (time >= timeout) {
  		time = 0;
  		return true;
  	}
  	return false;
  }
}

